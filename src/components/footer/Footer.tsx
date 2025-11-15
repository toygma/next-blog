"use client";
import React from "react";
import { GithubSvg, LinkedinSvg, YoutubeSvg } from "@/lib/svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t w-full">
      <div className="max-w-screen-xl mx-auto ">
        <div className="px-4 py-8 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
          <div className="flex items-center gap-2 text-gray-600 flex-1">
            <a
              href="https://www.youtube.com/@toygma"
              aria-label="Youtube Profile of Toygma"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <YoutubeSvg />
            </a>
            <a
              href="https://www.linkedin.com/in/toygma/"
              aria-label="Linkedin Profile of Toygma"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <LinkedinSvg />
            </a>
            <a
              href="https://github.com/toygma"
              target="_blank"
              aria-label="Github Profile of Toygma"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <GithubSvg />
            </a>
          </div>

          <div className="flex-1 text-center">
            <p className="text-[14px] text-gray-600">
              © 2025 Toygma. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Link href={"/privacy"} className="text-[14px] text-gray-600 cursor-pointer hover:underline">
              Privacy
            </Link>
            <Link href={"/terms"} className="text-[14px] text-gray-600 cursor-pointer hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
