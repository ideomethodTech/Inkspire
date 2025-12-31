import { Headline, BodyXS } from "../typography";
export default function OurStory() {
  return (
    <section className="bg-[#1f2226] text-white py-24 text-center px-6">
      <Headline className="text-2xl font-semibold mb-4">OUR STORY</Headline>
      <BodyXS className="max-w-2xl mx-auto text-sm text-gray-300">
        Inkspire was born from a love of creativity and
        storytelling. We wanted to bring bold, expressive
        art into everyday spaces — making walls more than
        just walls.
      </BodyXS>
    </section>
  );
}
