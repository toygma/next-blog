type Category = {
  id: string;
  name: string;
};

type Comment = {
  id: string;
  content: string;
  userId: string;
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
  slug:string;
  content: string;
  categories: Category[];
  createdAt: Date;
  views: number;
  likes: Likes[];
  comments: Comment[];
  featuredImage: string;
  postType: "Blog" | "Project" | string;
  userId: string | null;
};

export type CommentType = {
  user: {
    name: string | null;
    email: string;
  };
  id: string;
  postId: string;
  createdAt: Date;
  content: string;
  userId: string;
  updatedAt: Date;
};
