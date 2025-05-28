"use client";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";
import { minRead } from "@/utils/helper";
import DOMPurify from "dompurify";
import LikeButton from "@/components/liked/LikeButton";
import type { Like } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { LogIn, MessageCircle } from "lucide-react";
import CommentForm from "@/components/comments/CommentsForm";
import CommentList from "@/components/comments/CommentLists";
import { Separator } from "@/components/ui/separator";
import { CommentType } from "@/types/post.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type DetailPageProps = {
  posts: {
    id: string;
    title: string;
    content: string;
    featuredImage: string;
    createdAt: Date;
    categories: {
      name: string;
    }[];
    author: {
      name: string | null;
      email: string | null;
      image_url: string | null;
    };
  };
  likes: Like[];
  isLiked: boolean;
  comments: CommentType[];
  userId: string;
  
};

const DetailPage = ({
  posts,
  isLiked,
  likes,
  comments,
  userId,
}: DetailPageProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex flex-col">
      <header className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {posts?.categories?.map((item) => (
            <>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {item.name}
              </span>
            </>
          ))}
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Avatar className="h-10 w-10">
            <AvatarImage src={posts?.author?.image_url as string} />
            <AvatarFallback>{posts?.id}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{posts?.author?.name}</p>
            <p className="text-sm">
              {moment(posts?.createdAt).format("L")} · {minRead(posts?.content)}{" "}
              min read
            </p>
          </div>
        </div>
      </header>
      <div className="w-full">
        <Image
          alt={posts?.title}
          src={posts?.featuredImage}
          width={400}
          height={400}
          className="p-3 max-h-[600px] w-full object-cover"
        />
      </div>
      <div className="">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4 uppercase text-center">
          {posts?.title}
        </h1>
        <div
          ref={contentRef}
          className="prose prose-lg max-w-none dark:prose-invert tiptap"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(posts?.content),
          }}
        />
        <LikeButton postId={posts.id} likes={likes} isLiked={isLiked} />
        {/* Comments Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              {comments?.length} Comments
            </h2>
          </div>

          {/* Comment Form */}
          {userId ? (
            <CommentForm postId={posts?.id}  />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border p-6 shadow-sm bg-background/60">
              <div className="flex items-center gap-3 text-muted-foreground">
                <LogIn className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Log in to comment</h2>
              </div>
              <Link href="/sign-in">
                <Button variant="default" className="px-6 py-2 text-sm">
                  Go to Login
                </Button>
              </Link>
            </div>
          )}
          <Separator />
          {/* Comments List */}
          <CommentList comments={comments} />
        </Card>
      </div>
    </main>
  );
};

export default DetailPage;
