"use client";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import LikeButton from "@/components/liked/LikeButton";
import CommentForm from "@/components/comments/CommentsForm";
import CommentList from "@/components/comments/CommentLists";
import { LogIn, MessageCircle, Calendar, Clock } from "lucide-react";
import { DeleteSvg, EditSvg } from "@/lib/svg";
import { deletePost } from "@/lib/actions/admin/delete.post";
import { incrementPostViews } from "@/lib/actions/user/increment.views";
import { authClient } from "@/lib/auth-client";
import { minRead } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import moment from "moment";
import "moment/locale/tr";

moment.locale("tr");

type DetailPageProps = {
  posts: {
    id: string;
    title: string;
    content: string; 
    featuredImage: string;
    createdAt: Date;
    categories: { name: string }[];
    user: {
      name: string | null;
      email: string | null;
    };
  };
  likes: any[];
  isLiked: boolean;
  comments: any[];
  userId: string | undefined;
};

const DetailPage = ({ posts, isLiked, likes, comments, userId }: DetailPageProps) => {
  const id = useParams()?.id as string;
  const { data: session } = authClient.useSession();
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Görüntülenme sayacı
  useEffect(() => {
    const viewedKey = `viewedPost-${id}`;
    if (!sessionStorage.getItem(viewedKey)) {
      incrementPostViews(id);
      sessionStorage.setItem(viewedKey, "true");
    }
  }, [id]);

  const handleConfirmDelete = () => {
    startTransition(async () => {
      const result = await deletePost(id);
      if (result.success) {
        toast.success("Post silindi");
        router.push("/");
      } else {
        toast.error(result.error || "Bir hata oluştu");
      }
      setModalOpen(false);
    });
  };

  return (
    <main className="min-h-screen ">
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Öne Çıkan Görsel */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            alt={posts.title}
            src={posts.featuredImage}
            width={1200}
            height={600}
            className="w-full h-auto max-h-[500px] object-cover"
            priority
          />
        </div>

        {/* Başlık ve Meta Bilgiler */}
        <header className="mb-8 space-y-6">
          {/* Kategoriler */}
          <div className="flex flex-wrap gap-2">
            {posts.categories.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Başlık */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {posts.title}
          </h1>

          {/* Yazar ve Tarih Bilgileri */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${posts.user.name}`}
                  alt={posts.user.name || "User"}
                />
                <AvatarFallback>{posts.user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{posts.user.name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {moment(posts.createdAt).format("LL")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {minRead(posts.content)} dk
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Butonları */}
            {session?.user?.role === "admin" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/edit/${posts.id}`)}
                >
                  <EditSvg />
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(true)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <DeleteSvg />
                  Sil
                </Button>
              </div>
            )}
          </div>
        </header>

        <Separator className="my-8" />

        {/* İçerik - React-Quill HTML */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: posts.content }}
        />

        <Separator className="my-8" />

        {/* Beğeni Butonu */}
        <LikeButton postId={posts.id} likes={likes} isLiked={isLiked} />

        {/* Yorumlar Bölümü */}
        <Card className="mt-10 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">
              {comments.length} Yorum
            </h2>
          </div>

          {userId ? (
            <div className="mb-6">
              <CommentForm postId={posts.id} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 mb-6 rounded-xl border-2 border-dashed bg-muted/20">
              <LogIn className="h-8 w-8 text-primary" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Yorum yapmak için giriş yapın</h3>
                <p className="text-sm text-muted-foreground">
                  Düşüncelerinizi paylaşmak için hesabınıza giriş yapın
                </p>
              </div>
              <Link href="/giris-yap">
                <Button>Giriş Yap</Button>
              </Link>
            </div>
          )}

          <Separator className="mb-6" />
          <CommentList comments={comments} />
        </Card>
      </article>

      {/* Silme Onay Modal */}
      <Modal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isPending}
        title="Post Sil"
        description="Bu postu silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      />
    </main>
  );
};

export default DetailPage;