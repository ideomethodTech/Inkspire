import { HERO_FRAMES } from "@/constants/hero";
import FloatingFrame from "./FloatingFrame";

export default function HeroFrames() {
  return (
    <div className="hidden md:block">
      {HERO_FRAMES.map((frame) => (
        <FloatingFrame
          key={frame.id}
          src={frame.src}
          width={frame.width}
          height={frame.height}
          className={frame.className}
        />
      ))}
    </div>
  );
}
