"use client";
import { useEffect, useRef, useState } from "react";
import Modal from "../modal/Modal";
import ButtonGetInTouch from "../button/Button";
import ModalUserButton from "./partials/ModalUserButton";
import DarkModeButton from "./partials/DarkModeButton";

const Header = () => {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`border-b  fixed top-0 w-full z-50 backdrop-blur-md transition-transform duration-300 ${
        scrollDir === "down" ? "md:-translate-y-full " : "md:translate-y-0"
      }`}
    >
      <div className="max-w-screen-xl mx-auto md:px-0 px-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="md:text-xl sm:text-[16px] text-[12px] relative element cursor-pointer group">
            Dev-Journey.
            <span className="bg-gray-600 absolute bottom-0 left-0 h-[2px] w-[70px] group-hover:w-full transition-all duration-300"></span>
          </h1>
          <div className="flex items-center gap-4">
            <DarkModeButton />
            <ModalUserButton />
            <div>
              <ButtonGetInTouch setIsModalOpen={setIsModalOpen} />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
