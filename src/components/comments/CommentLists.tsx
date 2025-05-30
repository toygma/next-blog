"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";
import { nameSplit } from "@/utils/helper";
import { DeleteSvg, EditSvg } from "@/lib/svg";
import { useAuth } from "@clerk/nextjs";
import EditingComment from "./partials/EditingComment";
import DeleteModal from "./partials/DeleteModel";
import { toast } from "sonner";
import { deleteComment } from "@/lib/actions/delete.comment";
import { showFormErrors } from "@/utils/showErrors";
type CommentListProps = {
  comments: {
    author: {
      name: string | null;
      email: string | null;
      image_url: string | null;
      clerkUserId?: string | null;
    };
    id: string;
    createdAt: Date;
    content: string;
  }[];
};
const CommentList = ({ comments }: CommentListProps) => {
  const { userId } = useAuth();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteConfirm = async (id:string) => {
    const result = await deleteComment(id);
    if (result.success) {
      toast.success("Comment deleted successfully");
      setIsModalOpen(false);
    } else {
      showFormErrors(result.errors);
    }
  };

  return (
    <div className="space-y-8 ">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author.image_url as string} />
            <AvatarFallback>
              {comment.author.name?.charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-medium text-foreground">
                  {nameSplit(comment?.author?.name as string)}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {moment(comment?.createdAt).format("L")}
                </span>
              </div>
              {comment?.author?.clerkUserId === userId && (
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
                    <DeleteModal
                      isOpen={isModalOpen}
                      onCancel={() => {
                        setIsModalOpen(false);
                      }}
                      onConfirm={()=>{
                        handleDeleteConfirm(comment.id)
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
