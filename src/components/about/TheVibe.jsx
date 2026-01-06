import Image from "next/image";
import { Headline, BodyXS } from "../typography";

export default function TheVibe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <Headline className="text-2xl font-semibold mb-4">
        THE VIBE
      </Headline>

      <BodyXS className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-12">
        Our mission is simple — to help you turn inspiration into expression.
        Whether it’s the thrill of speed, the pulse of sports, or the rebellious
        charm of pop culture, each piece we craft is made to spark emotion and
        add character to your space.
      </BodyXS>

      {/* IMAGE LAYOUT */}
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 items-start">

       {/* LEFT — LARGE IMAGE */}
<div className="relative w-full h-[520px] overflow-hidden">
  <div className="relative w-full h-full scale-70 md:scale-85">
    <Image
      src="/about/vibei.jpg"
      alt="Vibe"
      fill
      className="object-cover rounded-md"
      priority
    />
  </div>
</div>


        {/* RIGHT — STACKED IMAGES */}
        <div className="flex flex-col gap-6">

          <div className="relative w-full h-[240px]">
            <div className="relative w-full h-full scale-90 md:scale-100">
            <Image
              src="/about/vibeii.jpg"
              alt="Vibe detail"
              fill
              className="object-cover"
            />
          </div>
          </div>

          <div className="relative w-full h-[240px]">
            <Image
              src="/about/vibeiii.jpg"
              alt="Vibe detail"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
