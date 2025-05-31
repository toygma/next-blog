"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DefaultHeader } from "./default-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
type ExtendedComment = Comment & {
  author: {
    name: string;
    email: string;
    updatedAt: string;
  };
  content: string;
  id:string;
};

export const columns: ColumnDef<ExtendedComment>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: (info) => <DefaultHeader info={info} name="Name" />,
    accessorFn: (row) => row?.author?.name ?? "—",
    id: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: (info) => <DefaultHeader info={info} name="Email" />,
    accessorFn: (row) => row?.author?.email ?? "—",
    id: "email",
    cell: (info) => info.getValue(),
  },
  {
    header: () => <p>Comment</p>,
    accessorFn: (row) => row?.content ?? "—",
    id: "content",
    cell: (info) => info.getValue(),
  },
  {
    header: (info) => <DefaultHeader info={info} name="CreatedAt" />,
    accessorFn: (row) => {
      return moment(row?.author?.updatedAt).format("L");
    },
    id: "updatedAt",
    cell: (info) => info.getValue(),
  },
  {
    id: "more",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className=""
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
             className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(row.original.content)
              }
            >
              Copy Comment
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => console.log("Delete", row.original.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
