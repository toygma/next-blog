"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DefaultHeader } from "./default-header";
import RowActions from "./row-action";

type ExtendedComment = Comment & {
  user: {
    name: string;
    email: string;
    updatedAt: string;
  };
  content: string;
  id: string;
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
    accessorFn: (row) => row?.user?.name ?? "—",
    id: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: (info) => <DefaultHeader info={info} name="Email" />,
    accessorFn: (row) => row?.user?.email ?? "—",
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
      return moment(row?.user?.updatedAt).format("L");
    },
    id: "updatedAt",
    cell: (info) => info.getValue(),
  },
  {
    header: () => <p>Action</p>,
    id: "more",
    cell: ({ row }) => <RowActions comment={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
