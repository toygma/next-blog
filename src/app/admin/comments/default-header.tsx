import { HeaderContext } from "@tanstack/react-table";
import React from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

interface DefaultHeaderProps<TData, TValue> {
  info: HeaderContext<TData, TValue>;
  name: string;
}

export function DefaultHeader<TData, TValue>({
  info,
  name,
}: DefaultHeaderProps<TData, TValue>) {
    const sorted = info.column.getIsSorted();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        info.column.toggleSorting(sorted === "asc");
      }}
      className="cursor-pointer select-none flex w-full h-full items-center justify-start"
    >
      {name}
      {sorted === "asc" && <FaSortAlphaDown/>}
      {sorted === "desc" && <FaSortAlphaUp/>}
    </div>
  );
}
