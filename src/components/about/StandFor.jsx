
import { Headline, BodyXS } from "../typography";

export default function StandFor() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">
      <Headline className="text-2xl font-semibold mb-6">
        WE STAND FOR
      </Headline>
      <BodyXS className="text-sm text-gray-600 leading-relaxed">
        Quality. Creativity. Expression. Sustainability.
        Every piece is crafted responsibly and designed to
        inspire confidence, emotion, and individuality.
      </BodyXS>
    </section>
  );
}
