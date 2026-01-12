import Image from "next/image";

export default function TiltedBanner() {
  return (
    <section className="relative w-full px-6 py-12 overflow-hidden">
      {/* Caption */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-wider">
        THE COLLECTION DOESNT END
        </h2>
        <p className="text-xl tracking-wider mt-1">HERE</p>
      </div>
      
      <div className="relative w-full h-[150px]">
        <div className="absolute inset-0 transform -rotate-3 origin-center scale-110">
          <Image
            src="/begin/tilted.jpg"
            alt="Tilted Banner"
            fill
            className="object-cover rounded-xl shadow-md"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}