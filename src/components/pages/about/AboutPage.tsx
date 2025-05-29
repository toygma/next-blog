"use client";

import Image from "next/image";
import { GithubSvg, LinkedinSvg, YoutubeSvg } from "@/lib/svg";

const AboutPage = () => {
  return (
    <div className="mt-8">
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">About Me</h1>
        <p className="text-lg text-gray-700 text-center mb-8 dark:text-gray-200">
          Welcome to my website! I am committed to providing you with the best
          content and resources.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto max-w-screen-xl px-4 py-4">
        <div>
          <p className="text-[16px]  text-[#52525b] dark:text-gray-200">
            My journey into technology began with a deep curiosity about how
            systems work — especially the ones that power the internet. That
            curiosity evolved into a passion for cybersecurity and software
            development. Over time, I&apos;ve dedicated myself to understanding
            not just how to build applications, but how to protect them.
          </p>
          <br />

          <p className="text-[16px]  text-[#52525b] dark:text-gray-200">
            Today, I&apos;m diving deep into full-stack development with a
            strong emphasis on cybersecurity. I&apos;m building modern web
            applications using technologies like Next.js 15, where I focus on
            clean architecture, reusable components, and performance
            optimization. My current project features a modular layout with a
            persistent sidebar and dynamic tabs like Work, Blog, and About —
            reflecting my love for both design and function.
          </p>
          <br />

          <p className="text-[16px]  text-[#52525b] dark:text-gray-200">
            Outside of coding, I&apos;m actively learning about cyber and
            digital policing, exploring best practices in secure coding, and
            expanding my knowledge in cloud infrastructure and application
            security. I believe in continuous growth and contributing to a
            safer, smarter digital world.
          </p>
          <br />
        </div>
        <div className="md:ml-12">
          <div className="md:aspect-[12/9] w-full relative">
            <Image
              alt="About Image"
              src="/images/about.png"
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-lg shadow-xl drop-shadow-2xl shadow-blue-500/40"
            />
          </div>
          <div className="mt-20 flex flex-col gap-3 md:items-start items-center">
            <p className="flex items-center gap-2 text-[16px]  text-[#52525b] hover:bg-background  cursor-pointer p-2 rounded-md  group hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 dark:text-gray-200">
              <GithubSvg />
              <a href={"https://github.com/t0kodev"} rel="noopener noreferrer" target="_blank" className="group-hover:text-transparent" aria-label="Github Profile of Toygun Bektasoglu">
                {" "}
                Follow me on GitHub
              </a>
            </p>
            <p className="flex items-center gap-2 text-[16px]  text-[#52525b] hover:bg-background  cursor-pointer p-2 rounded-md  group hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 dark:text-gray-200">
              <LinkedinSvg />
              <a href={"https://www.linkedin.com/in/toko-dev/"} rel="noopener noreferrer" target="_blank" className="group-hover:text-transparent" aria-label="Likedin Profile of Toygun Bektasoglu">
                Follow me on Linkedin
              </a>
            </p>
            <p className="flex items-center gap-2 text-[16px]  text-[#52525b] hover:bg-background  cursor-pointer p-2 rounded-md  group hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 dark:text-gray-200">
              <YoutubeSvg />
              <a href={"https://www.youtube.com/@toko_dev"} rel="noopener noreferrer" target="_blank" className="group-hover:text-transparent" aria-label="Youtube Profile of Toygun Bektasoglu">
                Follow me on Youtube
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
