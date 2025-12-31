import Image from "next/image";
import { Headline, BodyXS } from "../typography";
import ArrowButton from "../ui/ArrowButton";

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] w-full">
      <Image
        src="/about/@zahirahcharisma.jpg"
        alt="About Inkspire"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
        <Headline className="text-white text-4xl md:text-6xl font-medium">
          ABOUT US
        </Headline>
        <BodyXS className="text-white mt-4 max-w-2xl text-center">
          Welcome to Key Figures, where we celebrate the visionaries transforming the fashion world. Meet the iconic designers, groundbreaking style icons, and influential speakers who will be gracing our event. Explore the trailblazers shaping the future of fashion and get inspired by their remarkable contributions to the industry.
        </BodyXS>
        <ArrowButton />
      </div>
    </section>
  );
}
