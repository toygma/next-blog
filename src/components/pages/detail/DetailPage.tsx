"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";
import { minRead } from "@/utils/helper";
import DOMPurify from "dompurify";
import LikeButton from "@/components/liked/LikeButton";
import { Card } from "@/components/ui/card";
import { LogIn, MessageCircle } from "lucide-react";
import CommentForm from "@/components/comments/CommentsForm";
import CommentList from "@/components/comments/CommentLists";
import { Separator } from "@/components/ui/separator";
import { CommentType } from "@/types/post.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteSvg, EditSvg } from "@/lib/svg";
import { deletePost } from "@/lib/actions/admin/delete.post";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import { incrementPostViews } from "@/lib/actions/user/increment.views";
import { authClient } from "@/lib/auth-client";
import { Like } from "@/lib/generated/prisma";

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
    user: {
      name: string | null;
      email: string | null;
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
  const id = useParams()?.id as string;
  const { data: session } = authClient.useSession();
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const viewedKey = `viewedKey-${id}`;
    const alreadyViewed = localStorage.getItem(viewedKey);
    if (!alreadyViewed) {
      incrementPostViews(id);
      localStorage.setItem(viewedKey, "true");
    }
  }, [id]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      const result = await deletePost(id);
      if (result.success) {
        toast.success("Post deleted successfully");
        setModalOpen(false);
        router.push("/");
      } else {
        toast.error(result.error || "Something went wrong");
        setModalOpen(false);
      }
    });
  };

  return (
    <main className="flex flex-col md:p-0 p-4">
      <header className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {posts?.categories?.map((item, index:any) => (
            <>
              <span
                key={index}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {item.name}
              </span>
            </>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground">
            <Avatar className="h-10 w-10">
             <AvatarImage src={"https://gravatar.com/avatar/60b78e9cc51aac82d2bd46515ea7c01d?s=400&d=robohash&r=x"} />
              <AvatarFallback>{posts?.id}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">
                {posts?.user?.name}
              </p>
              <p className="text-sm">
                {moment(posts?.createdAt).format("L")} ·{" "}
                {minRead(posts?.content)} min read
              </p>
            </div>
          </div>
          {session?.user?.role === "admin" && (
            <div className="flex items-center gap-2 pr-4">
              <span onClick={() => router.push(`/admin/edit/${posts?.id}`)}>
                <EditSvg />
              </span>
              <div>
                <span onClick={handleModalOpen}>
                  <DeleteSvg />
                </span>
                <Modal
                  isOpen={modalOpen}
                  onCancel={() => setModalOpen(false)}
                  onConfirm={handleConfirmDelete}
                  loading={isPending}
                  title="Delete Post"
                  description="Are you sure you want to delete this post? This action cannot be undone."
                />
              </div>
            </div>
          )}
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
              {comments?.length} Yorumlar
            </h2>
          </div>

          {/* Comment Form */}
          {userId ? (
            <CommentForm postId={posts?.id} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border p-6 shadow-sm bg-background/60">
              <div className="flex items-center gap-3 text-muted-foreground">
                <LogIn className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Yorum yapmak için giriş yapınız</h2>
              </div>
              <Link href="/giris-yap">
                <Button
                  variant="default"
                  className="px-6 py-2 text-sm"
                  type="button"
                >
                  Giriş yap
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
