import FloatingFrame from "./FloatingFrame";

export default function HeroFrames({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="hidden md:block">
      {products.map((product) => (
        <FloatingFrame
          key={product.id}
          images={product.images} // pass images array
        />
      ))}
    </div>
  );
}
