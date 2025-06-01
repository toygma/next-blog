"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { deleteCommentAsAdmin } from "@/lib/actions/admin/delete.comment";
import { toast } from "sonner";
import { showFormErrors } from "@/utils/showErrors";
import Modal from "@/components/ui/modal";
import { useState } from "react";

type RowActionsProps = {
  comment: {
    id: string;
    content: string;
  };
};

export default function RowActions({ comment }: RowActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteCommentAsAdmin(comment.id);
    setLoading(false);

    if (result?.success) {
      toast.success("Comment deleted successfully");
      setIsModalOpen(false);
    } else {
      showFormErrors(result?.error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigator.clipboard.writeText(comment.content)}
          >
            Copy Comment
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        loading={loading}
        onConfirm={handleDelete}
      />
    </>
  );
}