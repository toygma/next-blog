"use client";
import React, { useState } from "react";
import FormInput from "@/components/input/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { editComment } from "@/lib/actions/edit.comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentPostInput,
  commentPostSchema,
} from "@/validation/comment.schema";
import { toast } from "sonner";
import { showFormErrors } from "@/utils/showErrors";

type EditingCommentProps = {
  commentId: string;
  onSuccess: () => void;
};

const EditingComment = ({ commentId, onSuccess }: EditingCommentProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<CommentPostInput>({
    resolver: zodResolver(commentPostSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const handleUpdate = async (data: CommentPostInput) => {
    setLoading(true);
    const res = await editComment(commentId,data.content);

    if (res.success) {
      onSuccess();
       toast.success("Comment updated successfully.");
    } else {
      showFormErrors(res.errors)
    }

    setLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="flex flex-col gap-2"
      >
        <FormInput
          control={form.control}
          name="content"
          multiline
          placeholder="Editing comment"
          error={form.formState.errors.content}
        />
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update
        </Button>
      </form>
    </Form>
  );
};

export default EditingComment;
