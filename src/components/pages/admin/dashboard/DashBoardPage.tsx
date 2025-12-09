import { FileText, MessageCircle, PlusCircle,  Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {prisma} from "@/lib/prisma";
import LatestMembers from "./partials/LatestMembers";
import LatestPosts from "./partials/LatestPosts";
import MostLikedPosts from "./partials/MostLikedPosts";
import moment from "moment";

export async function DashBoardPage() {
  const [post, totalComments] = await Promise.all([
    prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        user: {
          select: {
            name: true,
            email: true,
          }
        },
      },
    }),
    prisma.comment.count(),
  ]);

  const mostViewedPost = await prisma.post.findFirst({
    orderBy: {
      views: "desc",
    },
    select: {
      title: true,
      views: true,
      createdAt: true,
    },
  });

  return (
    <main className="flex-1 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="sm:text-3xl text-sm font-bold text-foreground">
            Blog Dashboard
          </h1>
          <p className="text-muted-foreground md:block hidden">
            Manage your content and analytics
          </p>
        </div>
        <Link href={"/admin/create"}>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Post</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{post.length}</div>
           
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Viewed Post
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold text-foreground">
              {mostViewedPost?.title}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mostViewedPost?.views} views •{" "}
              {moment(mostViewedPost?.createdAt).format("LL")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 mb-8">
        {/* Users who are the latest members */}
        <LatestMembers />
        {/* Posts who are the latest post */}
        <LatestPosts />
        {/* Most who are the latest post */}
        <MostLikedPosts />
      </div>
    </main>
  );
}
