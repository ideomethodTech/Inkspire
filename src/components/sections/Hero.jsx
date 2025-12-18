"use client";
import Image from "next/image";
import { HeadlineXL, Body2 } from "../typography";
import ArrowButton from "@/components/ui/ArrowButton";



export default function Hero() {
  return (
<section className="relative h-screen  bg-gradient-to-b from-[#F7F7F7] via-[#F7F7F7] to-[#F7DDDD]/40 overflow-hidden">


{/* Floating images */}
<div className="hidden md:block">
<Image
src="/asset/frame-f.jpg"
alt="frame1"
width={340}
height={207}
className="
    absolute
    left-[-23px]
    scale-75 sm:scale-90 lg:scale-80
    origin-top-left hidden md:block
  "
/>
<Image
src="/asset/frame-i.jpg"
alt="frame i"
width={250}
height={220}
className="absolute  left-[500px] rotate-0 opacity-100
 scale-70 sm:scale-85 lg:scale-80
    origin-top-left hidden md:block
  "
/>

<Image
  src="/asset/frame-c.jpg"
  alt="framce c"
  width={184.84}
  height={180}
  className="absolute  left-[855px] rotate-0 opacity-100
   scale-70 sm:scale-85 lg:scale-80
    origin-top-left hidden md:block
  "
/>
<Image
src="/asset/frame-d.jpg"
alt="frame d"
width={398}
height={335}
className="
absolute

left-[1020px]
rotate-0
opacity-100
 scale-70 sm:scale-85 lg:scale-80
    origin-top-left hidden md:block
  
"
/>
<Image
src="/asset/frame-e.jpg"
alt="frame e"
width={184.64}
height={208.68}
className="absolute top-[219px] left-[1180px] rotate-0
scale-70 sm:scale-85 lg:scale-80 opacity-100 hidden md:block"
/>
<Image
src="/asset/frame-b.jpg"
alt="frame b"
width={546}
height={295}
className="absolute top-[420px] left-[1020px] rotate-0 opacity-100
 scale-70 sm:scale-85 lg:scale-60
    origin-top-left hidden md:block
  "
/>
<Image
src="/asset/frame-a.jpg"
alt="frame a"
width={400}
height={204}
className="absolute top-[250px] left-[-1px] rotate-0 opacity-100
 scale-70 sm:scale-85 lg:scale-80
    origin-top-left hidden md:block
  "
/>
<Image
src="/asset/frame-g.jpg"
alt="frame g"
width={162}
height={220}
className="absolute top-[450px] left-[400px] rotate-0 opacity-100
 scale-70 sm:scale-85 lg:scale-70
    origin-top-left
   hidden md:block"
/>
<Image
src="/asset/frame-h.png"
alt="frame h"
width={128.12}
height={128.12}
className="absolute top-[510.26px] left-[310.13px] rotate-[-1deg] opacity-100
 scale-70 sm:scale-85 lg:scale-70
    origin-top-left hidden md:block
  "
/>
</div>

  {/* Center content */}
 <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 md:px-0">
    <HeadlineXL className="
    mb-2 md:mb-4
    -translate-x-4
    md:-translate-x-16
    xl:-translate-x-36
  ">
  Bring Your Mood
</HeadlineXL>


    <HeadlineXL className="mb-4 md:mb-6">
      To Your Walls
    </HeadlineXL>

   <Body2 className="text-[#121212] mb-8 mb-8 max-w-sm md:max-w-md">
      Discover posters that reflect you
    </Body2>
   <ArrowButton />

  </div>
</section>
  );
}
