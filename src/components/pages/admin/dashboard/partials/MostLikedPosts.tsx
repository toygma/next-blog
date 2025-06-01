import prisma from "@/lib/prisma";
import moment from "moment";
import React from "react";

const [posts] = await Promise.all([
  prisma.post.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: 10,
    include: {
      _count: {
        select: { likes: true },
      },
    },
  }),
]);
const MostLikedPosts = () => {
  return (
    <section className="w-full rounded-xl border bg-white dark:bg-[#18181B] p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Most Liked Posts</h2>
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-600 border-b dark:text-white">
              <th className="py-2 px-3 font-medium">Title</th>
              <th className="py-2 px-3 font-medium">Likes</th>
              <th className="py-2 px-3 font-medium">Created At</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 px-3 text-sm font-medium text-gray-900 dark:text-white">
                  {post.title || "—"}
                </td>
                <td className="py-3 px-3 text-sm text-gray-700 dark:text-white">
                  {post._count.likes}
                </td>
                <td className="py-3 px-3 text-sm text-gray-500 dark:text-white">
                  {moment(post.createdAt).format("LL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MostLikedPosts;
