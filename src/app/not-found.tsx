"use client";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <div className="flex items-center">
        <div className="h-[115px]">
          <span className="text-[86px] font-bold">4</span>
        </div>
        <span>
          <Image
            alt="emoji"
            title="emoji"
            width={400}
            height={400}
            src={"/images/emoji.png"}
            className="h-[86px] w-[86px] object-cover scale-125"
          />
        </span>
        <div className="h-[115px]">
          <span className="text-[86px] font-bold">4</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold">Oops! Page Not Be Found</h1>
        <p className="text-xl text-muted-foreground ">
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
      </div>
    </div>
  );
}
