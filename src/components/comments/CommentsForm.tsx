"use client";
import React, { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { createComments } from "@/lib/actions/user/create.comment";
import FormInput from "../input/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CommentPostInput,
  commentPostSchema,
} from "@/validation/comment.schema";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

type CommentFormProps = {
  postId: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [isPending, startTransition] = useTransition();
    const {data:session} = authClient.useSession();
    


  const form = useForm<CommentPostInput>({
    resolver: zodResolver(commentPostSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: CommentPostInput) => {
    startTransition(async () => {
      const res = await createComments(postId, { content: data.content });

      if (res.success) {
        toast.success("Comment successfully posted.");
        form.reset();
      } else {
        if (res.errors?.content) {
          toast.error(res.errors.content.join(", "));
        } else if (res.errors?.formErrors) {
          toast.error(res.errors.formErrors.join(", "));
        } else {
          toast.error("Something went wrong.");
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={"https://gravatar.com/avatar/60b78e9cc51aac82d2bd46515ea7c01d?s=400&d=robohash&r=x"} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <FormInput
              control={form.control}
              placeholder="Yorumunu yaz"
              name="content"
              error={form.formState.errors.content}
            />
            <div className="mt-4 flex justify-end">
              <Button type="submit" loading={isPending} disabled={isPending}>
                Gönder
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
