"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NAVIGATION_MENU } from "@/lib/constants/index";

export default function Header() {
  return (
    <header className="w-full bg-white font-sans  z-50  border-y-[0.6px] border-[#CCCCCC] fixed ">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-15.5">
        <div className="flex justify-between items-center h-22.5">
          {/* Left: Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-black  font-medium text-[30px] leading-[100%] tracking-[0%] uppercase"
            >
              INKSPIRE
            </Link>
          </div>

          {/* 
            Center: Mega Menu 
          */}
          <NavigationMenu.Root className="static hidden md:flex z-50">
            <NavigationMenu.List className="flex items-center gap-7.5 list-none m-0 p-0">
              {NAVIGATION_MENU.map((menuItem) => (
                <NavigationMenu.Item key={menuItem.id}>
                  <NavigationMenu.Trigger className="group flex items-center gap-1 cursor-pointer outline-none text-xs sm:text-sm  hover:text-black  transition-colors data-[state=open]:text-black font-normal lg:text-[16px] leading-5 tracking-[-0.02em] uppercase text-[#2D2D2D]">
                    {menuItem.label}
                    <div className="relative w-2.5 h-2.5 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-60 group-hover:opacity-100 group-data-[state=open]:opacity-100">
                      <Image
                        src="/assets/icons/arrow.svg"
                        alt="arrow"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content className="absolute left-0 top-0 w-full bg-white animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* MEGA MENU CONTENT: Fills 100% width of container */}
                    <div className="w-full border-t border-gray-100 bg-white shadow-xl rounded-b-md">
                      <div className="flex flex-row justify-between items-start gap-8 p-8 w-full">
                        {menuItem.sections?.map((section, index) => (
                          <div
                            key={index}
                            className="flex flex-col gap-4 flex-1"
                          >
                            {/* Section Title */}
                            {section.title ? (
                              <h4 className="text-sm font-bold text-gray-900 capitalize">
                                {section.title}
                              </h4>
                            ) : (
                              /* Spacer for alignment if no title */
                              <div className="h-5"></div>
                            )}

                            {/* Links List */}
                            <ul className="flex flex-col gap-2.5">
                              {section.items.map((linkItem) => (
                                <li key={linkItem.label}>
                                  <Link
                                    href={linkItem.href}
                                    className="text-sm text-gray-500 hover:text-black transition-colors block"
                                  >
                                    {linkItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>

            <div className="absolute top-full left-0 w-full">
              <NavigationMenu.Viewport className="relative bg-white overflow-hidden h-(--radix-navigation-menu-viewport-height) w-full transition-[height] duration-300 origin-top" />
            </div>
          </NavigationMenu.Root>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              aria-label="Search"
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Image
                src="/assets/icons/search.svg"
                alt="search icon"
                width={17.56}
                height={17.56}
              />
            </button>
            <button
              aria-label="Account"
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Image
                src="/assets/icons/profile.svg"
                alt="profile icon"
                width={17.56}
                height={17.56}
              />
            </button>
            <button
              aria-label="Wishlist"
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Image
                src="/assets/icons/like.svg"
                alt="like icon"
                width={17.56}
                height={17.56}
              />
            </button>
            <button
              aria-label="Cart"
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Image
                src="/assets/icons/cart.svg"
                alt="cart icon"
                width={17.56}
                height={17.56}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
