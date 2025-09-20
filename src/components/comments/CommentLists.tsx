"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";
import { nameSplit } from "@/utils/helper";
import { DeleteSvg, EditSvg } from "@/lib/svg";
import EditingComment from "./partials/EditingComment";
import { toast } from "sonner";
import { deleteComment } from "@/lib/actions/user/delete.comment";
import { showFormErrors } from "@/utils/showErrors";
import Modal from "../ui/modal";
import { authClient } from "@/lib/auth-client";
type CommentListProps = {
  comments: {
    user: {
      name: string | null;
      email: string | null;
      userId?: string | null;
    };
    id: string;
    userId: string;
    createdAt: Date;
    content: string;
  }[];
};
const CommentList = ({ comments }: CommentListProps) => {
 const { data: session } = authClient.useSession();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async (id: string) => {
    setLoading(true);
    const result = await deleteComment(id);
    if (result.success) {
      toast.success("Comment deleted successfully");
      setIsModalOpen(false);
      setLoading(false);
    } else {
      setLoading(false);

      showFormErrors(result.errors);
    }
  };


  return (
    <div className="space-y-8 ">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={"https://gravatar.com/avatar/60b78e9cc51aac82d2bd46515ea7c01d?s=400&d=robohash&r=x"} />
            <AvatarFallback>
              {comment.user.name?.charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-medium text-foreground">
                  {nameSplit(comment?.user?.name as string)}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {moment(comment?.createdAt).format("L")}
                </span>
              </div>
              {comment?.userId === session?.user?.id && (
                <div className="flex items-center justify-center gap-2 px-2">
                  <span
                    onClick={() =>
                      setEditingCommentId(
                        editingCommentId === comment.id ? null : comment.id
                      )
                    }
                  >
                    <EditSvg />
                  </span>
                  <span onClick={() => setIsModalOpen(true)}>
                    <DeleteSvg />
                  </span>
                  <Modal
                    isOpen={isModalOpen}
                    onCancel={() => {
                      setIsModalOpen(false);
                    }}
                    title="Are you sure you want to delete this comment?"
                    description="This action cannot be undone. This comment will be permanently deleted."
                    loading={loading}
                    onConfirm={() => {
                      handleDeleteConfirm(comment.id);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              {editingCommentId === comment.id ? (
                <EditingComment
                  commentId={comment.id}
                  onSuccess={() => setEditingCommentId(null)}
                />
              ) : (
                <p className="text-muted-foreground">{comment?.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
