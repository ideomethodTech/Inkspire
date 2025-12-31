import Image from "next/image";
import { Headline, BodyXS } from "../typography";

export default function TheVibe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <Headline className="text-2xl font-semibold mb-10">THE VIBE</Headline>
      <BodyXS className="text-gray-600 text-sm leading-relaxed">
        Our mission is simple — to help you turn inspiration into expression. Whether it’s the thrill of speed, the pulse of sports, or the rebellious charm of pop culture, each piece we craft is made to spark emotion and add character to your space.
      </BodyXS>

      <div className="grid md:grid-cols-2 gap-8">
        <Image
          src="/about/vibei.jpg"
          alt="Vibe"
          width={600}
          height={400}
          className="rounded-md"
        />
        <Image
          src="/about/vibeii.jpg"
          alt="Vibe"
          width={600}
          height={400}
          className="rounded-md"
        />
        <Image
          src="/about/vibeiii.jpg"
          alt="Vibe"
          width={600}
          height={400}
          className="rounded-md"
        />
      </div>
    </section>
  );
}
