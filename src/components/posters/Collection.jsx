import Image from "next/image";
import { Body1 } from "../typography";

const images = [
  "/begin/img3.jpg",
  "/begin/img3.jpg",
  "/begin/img3.jpg",
  "/begin/img3.jpg",
  "/begin/img3.jpg",
  "/begin/img3.jpg",
  "/begin/img3.jpg",
];

export default function TiltedBanner() {
  return (
    <section className="w-full py-20 overflow-hidden bg-white">
      {/* Heading */}
      <Body1 className="text-center mb-12">
        THE COLLECTION DOESN&apos;T END HERE
      </Body1>

      {/* Tilted carousel */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex gap-6 px-12 -rotate-4 origin-center">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="w-[320px] h-[180px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <Image
                src={src}
                alt={`Collection ${idx + 1}`}
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
