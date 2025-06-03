"use client";

import { Button } from "@/components/ui/button";
import { Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState, useTransition, useEffect } from "react";
import type { Like } from "@prisma/client";
import { toggleLike } from "@/lib/actions/user/like.toggle";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

type LikeButtonProps = {
  postId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes, isLiked }) => {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setLiked(isLiked);
    setLikeCount(likes.length);
  }, [isLiked, likes.length]);

  const handleLike = () => {
    if (!user) {
      return toast.error("Please sign in");
    }
    startTransition(async () => {
      if (liked) {
        setLiked(false);
        setLikeCount((count) => count - 1);
      } else {
        setLiked(true);
        setLikeCount((count) => count + 1);
      }
      await toggleLike(postId);
    });
  };

  //share

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this post!",
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully"))
        .catch(() => toast.error("Share canceled"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <Button
        type="button"
        variant="ghost"
        className="gap-2"
        onClick={handleLike}
        disabled={isPending}
        aria-pressed={liked}
      >
        {likeCount > 0 ? (
          <ThumbsDown className="h-5 w-5" />
        ) : (
          <ThumbsUp className="h-5 w-5" />
        )}
        {likeCount}
      </Button>
      <Button
        variant="ghost"
        className="gap-2"
        type="button"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5" /> Share
      </Button>
    </div>
  );
};

export default LikeButton;
