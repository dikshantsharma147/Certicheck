"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Button } from "./ui/button";
import Link from "next/link";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Easily",
    },
    {
      text: "issue",
    },
    {
      text: "and",
    },
    {
      text: "verify",
    },
    {
      text: "Certificates.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] z-10">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        No one likes paperwork. Let&apos;s make it easier.
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Button
          className="cursor-pointer"
          variant={"outline"}
          size={"lg"}
          asChild
        >
          <Link href={"/login"}>Login</Link>
        </Button>
        <Button size={"lg"} asChild>
          <Link href={"/verify"}>Verify</Link>
        </Button>
      </div>
    </div>
  );
}
