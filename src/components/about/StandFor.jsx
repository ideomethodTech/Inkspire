
import { Headline, BodyXS } from "../typography";

export default function StandFor() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">
      <Headline className="text-2xl font-semibold mb-6">
        WE STAND FOR
      </Headline>
      <div className="flex gap-4">
      <BodyXS className="text-sm text-gray-600 leading-relaxed">
       At Inkspire, creativity meets responsibility. We’re committed to quality, sustainability, and originality. Each poster is crafted with care — from ethically sourced materials to eco-friendly printing — ensuring that your walls not only look good but feel good to
      </BodyXS>
       <BodyXS className="text-sm text-gray-600 leading-relaxed">
       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      </BodyXS>
      </div>
    </section>
  );
}
