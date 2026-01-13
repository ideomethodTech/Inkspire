import Image from "next/image";
import { Headline, Body1 } from "../typography";

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
    <section className="w-full py-20 overflow-visible">
      {/* Heading */}
      <Body1 className="text-center mb-12">
        THE COLLECTION DOESN&apos;T END HERE
      </Body1>

      {/* Tilted row container */}
      <div className="relative w-full pb-20 overflow-visible">
        <div className="flex gap-6 px-10 transform -rotate-4 origin-center">
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