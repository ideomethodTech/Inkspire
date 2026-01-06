import { Headline, BodyXS } from "../typography";

export default function StandFor() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      
      <Headline className="text-2xl font-semibold mb-10 text-center">
        WE STAND FOR
      </Headline>

      <div className="grid md:grid-cols-2 gap-10">
        
        <BodyXS className="text-sm text-gray-600 leading-relaxed text-justify line-clamp-4">
          At Inkspire, creativity meets responsibility. We’re committed to
          quality, sustainability, and originality. Each poster is crafted
          with care — from ethically sourced materials to eco-friendly
          printing — ensuring that your walls not only look good but feel good.
        </BodyXS>

        <BodyXS className="text-sm text-gray-600 leading-relaxed text-justify line-clamp-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </BodyXS>

      </div>
    </section>
  );
}
