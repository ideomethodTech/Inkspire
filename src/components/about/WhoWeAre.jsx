import Image from "next/image";
import { Headline, BodyXS } from "../typography";

export default function WhoWeAre() {
return (
<section className="max-w-7xl mx-auto px-6 py-24">
<div className="grid md:grid-cols-2 gap-16 items-start">

{/* LEFT — BIG IMAGE */}
<div className="relative w-full h-[500px] md:-ml-24">
<Image
src="/about/whoweareii.jpg"
alt="Who we are"
fill
className="object-cover rounded-md"
priority
/>
</div>
{/* RIGHT — TEXT + IMAGE */}
<div className="flex flex-col gap-12">

{/* TEXT */}
<div>
  <Headline className=" mt-8 mb-6">
    WHO WE ARE REALLY
  </Headline>

  <BodyXS className="text-gray-600 leading-relaxed max-w-lg">
    We’re not just a poster brand — we’re your vibe curators.
    A squad of creators, dreamers, and culture junkies who live
    for bold ideas, crazy visuals, and stuff that makes your
    walls pop. Inkspire is where your personality meets art,
    and every print is a chance to flex your style.
  </BodyXS>
</div>
{/* SMALL IMAGE */}
<div className="relative w-full h-[280px] md:translate-x-10">
<Image
src="/about/whowearei.jpg"
alt="Our creative space"
fill
className="object-cover"
/>
</div>
</div>
</div>
</section>
);
}
