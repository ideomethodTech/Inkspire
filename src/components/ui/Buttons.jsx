"use client";

import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase tracking-wide rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#202125] focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[#202125] text-white hover:bg-[#202125]",
    outline:
      "border border-[#202125] text-[#202125] bg-transparent hover:bg-transparent",
    ghost:
      "text-[#202125] bg-transparent hover:underline",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
