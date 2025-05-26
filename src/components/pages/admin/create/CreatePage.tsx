"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CreatePostInput, createPostSchema } from "@/validation/create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/input/FormInput";
import FormCategory from "@/components/input/FormCategory";
import FormRadio from "@/components/input/FormRadio";
import { OPTIONS } from "./partials/data";
const CreatePage = () => {
  const [formData, setFormData] = useState({});

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
  });
  console.log(form.getValues("postType"))
  const onSubmit = async (data: CreatePostInput) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
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
                <FormCategory
                  control={form.control}
                  name="categories"
                  label="Category"
                  placeholder="Add tags and press enter"
                  error={form.formState.errors.categories}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <Input
                  id="featuredImage"
                  name="featuredImage"
                  type="file"
                  accept="image/*"
                />
                {form.formState.errors.featuredImage && (
                  <span className="font-medium text-sm text-red-500">
                    {form.formState.errors.featuredImage?.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <ReactQuill
                  theme="snow"
                  placeholder="Write something..."
                  className="h-72 mb-12"
                  onChange={(value) => {
                    setFormData({ ...formData, content: value });
                  }}
                />
                {form.formState.errors.content && (
                  <span className="font-medium text-sm text-red-500">
                    {form.formState.errors.content?.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create Post</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;
