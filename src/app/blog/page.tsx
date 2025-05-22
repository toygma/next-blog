"use client";

import { data } from "@/components/work/WorkPage";
import Image from "next/image";
import { motion } from "framer-motion";
import { CommentsSvg, Eyes, LikedSvg } from "@/lib/svg";

const BlogPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="grid grid-cols-1 gap-6 mt-4"
    >
      {data.map((item) => (
        <div
          key={item.id}
          className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex items-center gap-4 p-2 "
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Image container with overlay */}
          <div className="aspect-[14/8] relative overflow-hidden">
            <Image
              alt={item.title}
              src={item.image}
              title={item.title}
              width={250}
              height={350}
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {item.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title with gradient hover effect */}
            <h2 className="text-xl font-bold text-gray-800 mb-2.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
              {item.title}
            </h2>

            {/* Description with smooth appearance */}
            <p className="text-gray-600 mb-4 transition-all duration-500 group-hover:text-gray-700">
              {item.description.slice(0, 80)}...
            </p>

            {/* Animated button */}
            <button className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300 group/button cursor-pointer">
              <span className="relative overflow-hidden">
                {item.button}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300"></span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-4 h-4 transition-all duration-300 group-hover/button:translate-x-1 group-hover/button:text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2 mt-4 mb-2">
              <div>
                <p className="text-gray-500 text-sm flex items-center">
                  01.01.2025 - 7 min read
                </p>
              </div>
              <div className="mt-1">
                <p className="text-gray-500 text-sm flex items-center ">
                  <Eyes />
                  <span className="-mt-[2px]">3</span>
                </p>
              </div>
               <div className="mt-1">
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <CommentsSvg />
                  <span className="-mt-[2px]">3</span>
                </p>
              </div>
               <div className="mt-1">
                <p className="text-gray-500 text-sm flex items-center -mt-[1px]">
                  <LikedSvg />
                  <span className="-mt-[1px]">3</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default BlogPage;
