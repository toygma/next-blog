"use server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import prisma from "../../prisma";
import { auth } from "@clerk/nextjs/server";
import { createPostSchema } from "@/validation/create.schema";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UpdateArticleFormState = {
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

export const updatePost = async (
  postId: string,
  formData: FormData
): Promise<UpdateArticleFormState> => {
  let uploadResult: UploadApiResponse | null = null;

  try {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const rawCategories = formData.get("categories");
    const imageFile = formData.get("featuredImage") as File | null;

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

    const { userId } = await auth();
    if (!userId) {
      return {
        errors: {
          formErrors: ["You need to log in"],
        },
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { categories: true },
    });

    if (!existingPost || existingPost.authorId !== userId) {
      return {
        errors: {
          formErrors: ["Post not found or unauthorized."],
        },
      };
    }

    const connectedCategories = await Promise.all(
      result.data.categories.map(async (cat: { value: string }) => {
        return await prisma.category.upsert({
          where: { name: cat.value },
          update: {},
          create: { name: cat.value },
        });
      })
    );

    let imageUrl = existingPost.featuredImage;

    if (imageFile && imageFile.name !== "undefined") {
      if ((imageFile as any).size > MAX_FILE_SIZE) {
        return {
          errors: {
            featuredImage: ["Image size must be less than 2 MB"],
          },
        };
      }

      // Upload new image
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

      const publicId = getPublicIdFromUrl(existingPost.featuredImage);
      if (publicId) {
        await deleteCloudinaryImage(publicId);
      }

      imageUrl = uploadResult.secure_url;
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        title: result.data.title,
        postType: result.data.postType,
        content: result.data.content,
        featuredImage: imageUrl,
        categories: {
          set: [], 
          connect: connectedCategories.map((cat) => ({ id: cat.id })),
        },
      },
    });

    revalidatePath("/");

    return { success: true, errors: {} };
  } catch (error) {
    console.error("Update post error:", error);

    if (uploadResult?.public_id) {
      await deleteCloudinaryImage(uploadResult.public_id);
    }

    return {
      errors: {
        formErrors: ["An error occurred while updating the post."],
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

function getPublicIdFromUrl(url: string): string | null {
  const parts = url.split("/");
  const publicIdWithExtension = parts.slice(-1)[0];
  const [publicId] = publicIdWithExtension.split(".");
  return publicId ? `website/${publicId}` : null;
}
