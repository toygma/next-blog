"use client";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const ModalUserButton = () => {
  const { user } = useUser();

  const isAdmin = user?.publicMetadata?.isAdmin === true;

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <SignedIn>
        <UserButton />
      </SignedIn>
      {isAdmin && (
        <Link href={"/admin/create"}>
          <Button  type="button" className="block w-full text-left px-3 py-2 ">
            Admin Panel
          </Button>
        </Link>
      )}
      <SignedOut>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer text-xs md:text-sm h-8 px-3 md:h-9 md:px-4 rounded-md border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <SignInButton />
        </Button>

        <Button
          type="button"
          variant="outline"
          className="cursor-pointer text-xs md:text-sm h-8 px-3 md:h-9 md:px-4 rounded-md border-gray-300 hover:bg-gray-50 transition-colors sm:inline hidden"
        >
          <SignUpButton />
        </Button>
      </SignedOut>
    </div>
  );
};

export default ModalUserButton;
