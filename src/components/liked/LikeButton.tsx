"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState, useTransition, useEffect } from "react";
import type { Like } from "@prisma/client";
import { toggleLike } from "@/lib/actions/like.toggle";

type LikeButtonProps = {
  postId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  likes,
  isLiked,
}) => {
  const [isPending, startTransition] = useTransition();

  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setLiked(isLiked);
    setLikeCount(likes.length);
  }, [isLiked, likes.length]);

  const handleLike = () => {
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
       {likeCount > 0 ?  <ThumbsDown className="h-5 w-5" />: <ThumbsUp className="h-5 w-5" />}
        {likeCount}
      </Button>
      <Button variant="ghost" className="gap-2">
        <Bookmark className="h-5 w-5" /> Save
      </Button>
      <Button variant="ghost" className="gap-2">
        <Share2 className="h-5 w-5" /> Share
      </Button>
    </div>
  );
};

export default LikeButton;