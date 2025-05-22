"use client";

import Link from "next/link";
import { useState } from "react";

const data = [
  {
    id: 1,
    title: "Work",
    href:"/"
  },
  {
    id: 2,
    title: "Blog",
    href:"/blog"
  },
  {
    id: 3,
    title: "About",
    href:"/about"
  },
];

const Title = () => {
  const [active, setActive] = useState("Work");
  return (
    <nav className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold md:text-5xl text-4xl">Full Stack Developer</h1>
        <p className="italic">
          💭 &#39;I&apos;m a dreamer. I have to dream and reach for the stars,
          and if I miss a star then I grab a handful of clouds.&#34; — Mike
          Tyson
        </p>
      </div>
      <ul className="flex gap-8 border-b overflow-x-auto scrollbar-hide">
        {data.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.title)}
            className={`whitespace-nowrap px-1 py-2 text-lg font-medium flex-shrink-0 cursor-pointer transition-colors duration-200 ${
              active === item.title
                ? "text-black "
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Link href={item.href}> {item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Title;
