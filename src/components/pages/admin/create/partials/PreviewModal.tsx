"use client";

import Image from "next/image";
import { CreatePostInput } from "@/validation/create.schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import moment from "moment";
import "moment/locale/tr";
import { minRead } from "@/utils/helper";
import { useMemo } from "react";
moment.locale("tr");



interface PreviewContentProps {
  data: CreatePostInput & { featuredImage: File | string | null };
}

export default function PreviewContent({ data }: PreviewContentProps) {
  const imageSrc = useMemo(() => {
    if (!data.featuredImage) return null;
    if (typeof data.featuredImage === "string") return data.featuredImage;
    return URL.createObjectURL(data.featuredImage);
  }, [data.featuredImage]);

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Image */}
        {imageSrc && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-border/50">
            <Image
              src={imageSrc}
              alt={data.title}
              width={1200}
              height={600}
              className="w-full h-auto max-h-[500px] object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10 space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {data.categories?.map((cat, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {data.title || "Başlık Önizlemesi"}
          </h1>

          {/* Author & Meta */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-primary/10">
              <AvatarImage src="https://gravatar.com/avatar/?d=robohash" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">Ö</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Önizleme</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {moment().format("LL")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {minRead(data.content || "")} dk okuma
                </span>
              </div>
            </div>
          </div>
        </header>

        <hr className="my-8 border-border/60" />

      
        {/* İçerik - React-Quill HTML */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

      </article>
    </main>
  );
}