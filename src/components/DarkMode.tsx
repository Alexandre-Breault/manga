import { HiLightningBolt } from "react-icons/hi";
import Link from "next/link";
import React from "react";

export default function DarkMode() {
  return (
    <Link
      href={"/"}
      className="my-2 flex items-center space-x-1 text-indigo-500"
    >
      <HiLightningBolt className="h-8 w-8 flex-shrink-0 mr-3" />
      <span className="font-bold text-3xl font-sans tracking-tight whitespace-nowrap">
        Next-js Dev
      </span>
    </Link>
  );
}
