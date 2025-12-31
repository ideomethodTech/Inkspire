import Image from "next/image";
import { Headline, BodyXS } from "../typography";

export default function WallsSpeak() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <Headline className="text-2xl font-semibold mb-10">
        WALLS SPEAK —
      </Headline>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((img) => (
          <Image
            key={img}
            src={`/images/about/wall-${img}.jpg`}
            alt="Wall art"
            width={400}
            height={400}
            className="rounded-md"
          />
        ))}
      </div>
    </section>
  );
}
