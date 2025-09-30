/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { quillModules } from "@/lib/quillModules";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CreatePostInput, createPostSchema } from "@/validation/create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/input/FormInput";
import FormCategory from "@/components/input/FormCategory";
import FormRadio from "@/components/input/FormRadio";
import { OPTIONS } from "./partials/data";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createPosts } from "@/lib/actions/admin/create.post";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { showFormErrors } from "@/utils/showErrors";
import Image from "next/image";
import { generateTitle } from "@/utils/helper";

const CreatePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: CreatePostInput) => {
    const formData = new FormData();
    const slug = generateTitle(data.title);
    setLoading(true);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("slug", slug);
    formData.append("postType", data.postType);
    formData.append("categories", JSON.stringify(data.categories));
    if (data.featuredImage instanceof File) {
      formData.append("featuredImage", data.featuredImage);
    }
    try {
      const result = await createPosts(formData);
      if (result.errors) {
        showFormErrors(result?.errors);
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        form.setValue("title", "");
        form.setValue("postType", "");
      }
    } finally {
      toast.success("Created Post Successfully");
      setLoading(false);
      router.push("/");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Post</CardTitle>
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
                {form.watch("featuredImage") instanceof File && (
                  <Image
                    src={URL.createObjectURL(
                      form.watch("featuredImage") as any
                    )}
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
                          className="h-72 mb-12 max-w-[800px]"
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

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button disabled={loading} loading={loading} type="submit">
                  Create Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;
