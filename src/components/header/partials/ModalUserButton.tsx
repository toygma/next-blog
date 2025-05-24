"use client";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const ModalUserButton = () => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <SignedIn>
        <UserButton
  
        />
      </SignedIn>
      <SignedOut>
        <Button
          variant="outline"
          className="cursor-pointer text-xs md:text-sm h-8 px-3 md:h-9 md:px-4 rounded-md border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <SignInButton />
        </Button>

        <Button
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
