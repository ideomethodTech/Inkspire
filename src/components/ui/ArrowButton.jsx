"use client";
import { Label } from "../typography";

import React from "react";
import clsx from "clsx";

export default function ArrowButton({
  label = "Shop Now",
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center gap-2 rounded-full bg-white px-2 py-2",
        "transition-all duration-200 hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {/* Circle */}
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
        →
      </span>

      {/* Text */}
      <span className="text-sm font-medium tracking-wide text-black">
        {label}
      </span>
    </button>
  );
}
