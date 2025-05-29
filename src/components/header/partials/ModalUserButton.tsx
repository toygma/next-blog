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
    <div className="flex items-center gap-4 px-4">
      <SignedIn>
        <UserButton />
      </SignedIn>
      {isAdmin && (
        <Link href={"/admin/create"}>
          <Button type="button" className="block w-full text-left px-3 py-2 ">
            Admin Panel
          </Button>
        </Link>
      )}
      <SignedOut>
        <SignInButton>
          <Button
            type="button"
            variant="outline"
            className="text-sm h-9 px-4 rounded-md border-gray-300 hover:bg-gray-50"
          >
            Sign in
          </Button>
        </SignInButton>

        <SignUpButton>
          <Button
            type="button"
            variant="outline"
            className="text-sm h-9 px-4 rounded-md border-gray-300 hover:bg-gray-50"
          >
            Sign up
          </Button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
};

export default ModalUserButton;
