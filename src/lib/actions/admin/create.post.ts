"use server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import prisma from "../../prisma";
import { createPostSchema } from "@/validation/create.schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/get-session";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    postType?: string[];
    categories?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
  success?: boolean;
};

export const createPosts = async (
  formData: FormData
): Promise<CreateArticleFormState> => {
  let uploadResult: UploadApiResponse | null = null;
  try {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const rawCategories = formData.get("categories");
    const imageFile = formData.get("featuredImage") as File | null;
    if ((imageFile as any).size > MAX_FILE_SIZE) {
      return {
        errors: {
          featuredImage: ["Image size must be less than 2 MB"],
        },
      };
    }

    if (!imageFile || imageFile?.name === "undefined") {
      return {
        errors: {
          featuredImage: ["Image file is required."],
        },
      };
    }

    const result = createPostSchema.safeParse({
      title: formData.get("title"),
      categories: rawCategories ? JSON.parse(rawCategories as string) : [],
      content: formData.get("content"),
      postType: formData.get("postType"),
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const  session  = await getServerSession();
    if (!session.user.id) {
      return {
        errors: {
          formErrors: ["You need to log in"],
        },
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!existingUser) {
      return {
        errors: {
          formErrors: ["User not found. Please register."],
        },
      };
    }

    const categories = result.data.categories;
    const connectedCategories = await Promise.all(
      categories.map(async (cat: { value: string }) => {
        return await prisma.category.upsert({
          where: { name: cat.value },
          update: {},
          create: { name: cat.value },
        });
      })
    );

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "website" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      );
      uploadStream.end(buffer);
    });

    // Post created
    await prisma.post.create({
      data: {
        postType: result.data.postType,
        title: result.data.title,
        categories: {
          connect: connectedCategories.map((cat) => ({ id: cat.id })),
        },
        content: result.data.content,
        featuredImage: uploadResult.secure_url,
        userId: existingUser.id,
      },
    });

    revalidatePath("/");
    return { success: true, errors: {} };
  } catch (error) {
    console.error("Create post error:", error);

    if (uploadResult?.public_id) {
      await deleteCloudinaryImage(uploadResult.public_id);
    }

    return {
      errors: {
        formErrors: ["An error occurred. Please try again."],
      },
    };
  }
};

async function deleteCloudinaryImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
  }
}
