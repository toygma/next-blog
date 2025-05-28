"use client";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";
import { minRead } from "@/utils/helper";

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
};

const DetailPage = ({ posts }: DetailPageProps) => {
  console.log("🚀 ~ DetailPage ~ posts:", posts);

  return (
    <main className="flex flex-col">
      <header className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {posts.categories.map((item) => (
            <>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {item.name}
              </span>
            </>
          ))}
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Avatar className="h-10 w-10">
            <AvatarImage src={posts.author.image_url as string} />
            <AvatarFallback>{posts.id}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{posts.author.name}</p>
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
         
      </div>
    </main>
  );
};

export default DetailPage;
