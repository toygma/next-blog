"use client";
import React, { useState } from "react";
import Image from "next/image";
import ButtonGetInTouch from "../button/Button";
import Modal from "../modal/ContactModal";
import { SkillData } from "./partials/SkillData";
import { EmailSvg, LocationSvg, MessageSvg } from "@/lib/svg";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="lg:sticky lg:top-24 w-full mx-auto">
      <div className="rounded-2xl border bg-white dark:bg-gray-800  shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] backdrop-blur-sm">
        <div className="px-8 pt-12 pb-6 flex flex-col items-center text-center">
          <div className="w-44 h-44">
            <Image
              alt="Profile"
              src="/images/toygma-min.png"
              width={350}
              height={350}
              className="rounded-full mb-4 w-full h-full"
            />
          </div>
          <h1 className="text-[30px] text-[#111827] mt-4 font-bold mb-6 dark:text-gray-200">
            Toygma
          </h1>
          <ButtonGetInTouch setIsModalOpen={setIsModalOpen} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        <div className="px-8 pt-6 flex flex-col">
          <h2 className="text-[10px] text-[#111827] dark:text-gray-200">Beceriler & Araçlar</h2>
          <p className="flex flex-wrap gap-2 mt-4">
            {SkillData.map((skill) => (
              <span
                key={skill.id}
                className="py-2 px-3 rounded-xl border-gray-200 border text-[12px] text-[#374151] dark:text-gray-200"
              >
                {skill.name}
              </span>
            ))}
          </p>
        </div>
        <div className="px-8 pt-12 flex flex-col gap-2 pb-4">
          <h2 className="text-[10px] text-[#111827] dark:text-gray-200">İletişim</h2>
          <div className="flex items-center gap-2">
            <EmailSvg />
            <a href={"mailto:toygma.software@gmail.com"}  className="text-[14px] text-[#374151] hover:underline dark:text-gray-200">
              toygma.software@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <LocationSvg />
            <h3 className="text-[14px] text-[#374151] dark:text-gray-200">Istanbul, Turkey</h3>
          </div>
          <div className="flex items-center gap-2">
            <MessageSvg />
            <h3 className="text-[14px] text-[#374151] dark:text-gray-200">English, Turkish</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
