"use client"
import { GithubSvg, LinkedinSvg, YoutubeSvg } from "@/lib/svg";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t w-full">
      <div className="max-w-screen-xl mx-auto ">
        <div className="px-4 py-8 flex justify-between items-center md:flex-row flex-col">
          <div className="flex items-center gap-2 text-gray-400 flex-1">
             <Link href={"https://www.youtube.com/@DevJourneyYT"} target="_blank" className="cursor-pointer">
              <YoutubeSvg />
            </Link>
            <Link href={"https://www.linkedin.com/in/utku-bektasoglu/"} target="_blank" className="cursor-pointer">
              <LinkedinSvg />
            </Link>
            <Link href={"https://github.com/utkbkts"} target="_blank" className="cursor-pointer">
              <GithubSvg />
            </Link>
          </div>
          <div className="flex-1 text-center">
            <p className="text-[14px] text-gray-400">
              © 2025 Toygun. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <p className="text-[14px] text-gray-400 cursor-pointer hover:underline">Privacy</p>
            <p className="text-[14px] text-gray-400 cursor-pointer hover:underline">Terms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
