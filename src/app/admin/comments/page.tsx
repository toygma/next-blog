import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/prisma";
import type { ExtendedComment } from "@/types/comment.type";



async function getData(): Promise<ExtendedComment[]> {
  return await prisma.comment.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          updatedAt: true,
        },
      },
    },
  });
}

export default async function page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}