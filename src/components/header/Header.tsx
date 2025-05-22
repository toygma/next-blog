"use client";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl relative element cursor-pointer group">
            Dev-Journey.
            <span className="bg-gray-600 absolute bottom-0 left-0 h-[2px] w-[70px] group-hover:w-full transition-all duration-300"></span>
          </h1>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} className="cursor-pointer">
              My Blog
            </Button>
            <Button
              variant={"default"}
              className="cursor-pointer hover:bg-gradient-to-br  hover:from-[#134B42] hover:to-[#CA763A]"
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
