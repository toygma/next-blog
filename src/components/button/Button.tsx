import React from "react";
import { Button } from "../ui/button";

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
}

const ButtonGetInTouch = ({ setIsModalOpen }: Props) => {
  return (
    <Button
      onClick={() => setIsModalOpen(true)}
      variant={"default"}
      className="cursor-pointer hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 2L11 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M22 2L15 22L11 13L2 9L22 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      Get In Touch
    </Button>
  );
};

export default ButtonGetInTouch;
