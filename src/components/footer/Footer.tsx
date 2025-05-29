"use client";
import React from "react";
import { GithubSvg, LinkedinSvg, YoutubeSvg } from "@/lib/svg";

const Footer = () => {
  return (
    <div className="border-t w-full">
      <div className="max-w-screen-xl mx-auto ">
        <div className="px-4 py-8 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
          <div className="flex items-center gap-2 text-gray-400 flex-1">
            <a
              href="https://www.youtube.com/@toko_dev"
              aria-label="Youtube Profile of Toygun Bektasoglu"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <YoutubeSvg />
            </a>
            <a
              href="https://www.linkedin.com/in/toko-dev/"
              aria-label="Linkedin Profile of Toygun Bektasoglu"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <LinkedinSvg />
            </a>
            <a
              href="https://github.com/t0kodev"
              target="_blank"
              aria-label="Github Profile of Toygun Bektasoglu"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <GithubSvg />
            </a>
          </div>

          <div className="flex-1 text-center">
            <p className="text-[14px] text-gray-400">
              © 2025 Toygun. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <p className="text-[14px] text-gray-400 cursor-pointer hover:underline">
              Privacy
            </p>
            <p className="text-[14px] text-gray-400 cursor-pointer hover:underline">
              Terms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
