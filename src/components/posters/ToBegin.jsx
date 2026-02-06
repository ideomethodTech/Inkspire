import Image from "next/image";

export default function ToBegin() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-16 gap-6">
        <h2 className="text-3xl md:text-4xl font-semibold max-w-md leading-tight">
          WHERE DO YOU <br /> WANT TO BEGIN?
        </h2>

        <p className="text-sm text-gray-600 max-w-sm">
          Start Your Journey With What Inspires You — From Calm Devotion To
          Electric Pop Culture.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4">
        {/* Row 1 */}
        {/* img1 → col 1–2 */}
        <div className="col-span-2 h-[320px] relative">
          <Image
            src="/assets/begin/img5.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* img2 → col 3 */}
        <div className="h-[320px] relative">
          <Image
            src="/assets/begin/img2.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Row 2 */}
        {/* empty col 1 */}
        <div />

        {/* img7 → col 2–3 */}
        <div className="col-span-2 h-[260px] relative">
          <Image
            src="/assets/begin/img7.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-2 h-[320px] relative">
          <Image
            src="/assets/begin/img3.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* img2 → col 3 */}
        <div className="h-[320px] relative">
          <Image
            src="/assets/begin/img4.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
         <div className="col-span-2 h-[260px] relative">
          <Image
            src="/assets/begin/img6.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
          <div className="col-span-2 h-[320px] relative">
          <Image
            src="/assets/begin/img9.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* img2 → col 3 */}
        <div className="h-[320px] relative">
          <Image
            src="/assets/begin/img8.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
