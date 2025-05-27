"use client";

type DetailPageProps = {
  posts: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string | null;
      email: string | null;
      image_url: string | null;
    };
  };
};

const DetailPage = ({ posts }: DetailPageProps) => {
 console.log("🚀 ~ DetailPage ~ posts:", posts)
 
  return <div>DetailPage</div>;
};

export default DetailPage;
