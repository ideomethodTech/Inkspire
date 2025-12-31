import Image from "next/image";
import { Headline, BodyXS } from "../typography";

export default function WhoWeAre() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      
      <Image
        src="/about/whoweareii.jpg"
        alt="Who we are"
        width={500}
        height={600}
        className="rounded-md"
      />
      <Image
        src="/about/whowearei.jpg"
        alt="Who we are"
        width={500}
        height={600}
        className="rounded-md"
      />
      <div>
        <Headline className="text-2xl font-semibold mb-4">
          WHO WE ARE REALLY
        </Headline>
        <BodyXS className="text-gray-600 text-sm leading-relaxed">
          We’re not just a poster brand — we’re your canvas.
          A world of colors, moods, and art that makes your
          walls speak. Every print is a chance to express
          who you are.
        </BodyXS>
      </div>
    </section>
  );
}
