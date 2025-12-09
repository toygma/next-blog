"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostInput, createPostSchema } from "@/validation/create.schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/input/FormInput";
import FormCategory from "@/components/input/FormCategory";
import FormRadio from "@/components/input/FormRadio";
import { showFormErrors } from "@/utils/showErrors";
import { OPTIONS } from "../create/partials/data";
import { updatePost } from "@/lib/actions/admin/edit.post";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPostById } from "@/lib/actions/admin/postById";
import Image from "next/image";
import { quillModules } from "@/lib/quillModules";
import { generateTitle } from "@/utils/helper";
import PreviewContent from "../create/partials/PreviewModal";

const EditingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<any>(null);
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
  });
  const watchedValues = form.watch();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostById(id as string);
      if (postData) {
        setPost(postData);
        form.reset({
          title: postData.title,
          slug: postData.slug,
          postType: postData.postType,
          content: postData.content,
          categories: postData.categories.map((c: any) => ({
            label: c.name,
            value: c.name,
          })),
        });
      }
    };
    fetchData();
  }, [id, form]);

  const onSubmit = async (data: CreatePostInput) => {
    const formData = new FormData();
    const slug = generateTitle(data.slug);

    formData.append("title", data.title);
    formData.append("slug", slug);
    formData.append("content", data.content);
    formData.append("postType", data.postType);
    formData.append("categories", JSON.stringify(data.categories));
    if (data.featuredImage instanceof File) {
      formData.append("featuredImage", data.featuredImage);
    }

    try {
      setLoading(true);
      const result = await updatePost(id as string, formData);
      if (result.success) {
        toast.success("Post updated successfully");
        if (post) {
          router.push(`/posts/detay/${post.id}/${generateTitle(post.slug)}`);
        }
      } else {
        showFormErrors(result.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  const previewData = {
    ...watchedValues,
    featuredImage: watchedValues.featuredImage || null,
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormRadio
                  control={form.control}
                  name="postType"
                  error={form.formState.errors.postType}
                  label="Post Type"
                  options={OPTIONS}
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="title"
                  placeholder="Title"
                  error={form.formState.errors.title}
                  label="Post Title"
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="slug"
                  placeholder="Slug (ör: hello-world)"
                  error={form.formState.errors.slug}
                  label="Slug"
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <FormCategory
                  control={form.control}
                  name="categories"
                  label="Category"
                  placeholder="Add tags and press enter"
                  error={form.formState.errors.categories}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field: { onChange, value, ref, ...field } }) => (
                    <FormItem>
                      <FormLabel>Featured Images</FormLabel>
                      <FormControl>
                        <Input
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          {...field}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {post?.featuredImage && (
                  <Image
                    src={post?.featuredImage}
                    alt="featuredImage"
                    title="featuredImage"
                    width={400}
                    height={400}
                    className="object-cover h-[500px] w-full"
                  />
                )}
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name={"content"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          placeholder="Write something..."
                          className="h-72 mb-12"
                          value={field.value || ""}
                          onChange={field.onChange}
                          modules={quillModules}
                        />
                      </FormControl>
                      <FormMessage className="font-medium text-sm text-red-500">
                        {form.formState.errors?.content?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4 mt-[3rem]">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button disabled={loading} loading={loading} type="submit">
                  Editing Post
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsPreviewOpen(true)}
                  disabled={loading || !form.formState.isValid}
                >
                  Önizle
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative w-full h-full overflow-hidden bg-background">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-background/95 backdrop-blur border-b">
              <h2 className="text-xl font-bold">Post Önizleme</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsPreviewOpen(false)}
              >
                Kapat
              </Button>
            </div>
            <div className="h-[calc(100vh-60px)] overflow-y-auto">
              <PreviewContent data={previewData as any} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditingPage;
