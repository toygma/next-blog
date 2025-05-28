type Category = {
  id: string;
  name: string;
};

type Comment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
};

type Likes = {
  id: string;
  postId: string;
  userId: string;
};

export type PostType = {
  id: string;
  title: string;
  content: string;
  categories: Category[];
  createdAt: Date;
  views: number;
  likes: Likes[];
  comments: Comment[];
  featuredImage: string;
  postType: "Blog" | "Project" | string;
  authorId: string;
};

export type CommentType = {
  author: {
    name: string | null;
    email: string;
    image_url: string | null;
  };
  id: string;
  postId: string;
  createdAt: Date;
  content: string;
  authorId: string;
  updatedAt: Date;
};
