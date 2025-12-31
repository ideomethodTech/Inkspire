import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import OurStory from "@/components/about/OurStory";
import TheVibe from "@/components/about/TheVibe";
import StandFor from "@/components/about/StandFor";
import ShopWithUs from "@/components/sections/ShopWithUs";
import WallsSpeak from "@/components/about/WallsSpeak";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <WhoWeAre />
      <OurStory />
      <TheVibe />
      <StandFor />
      <ShopWithUs />
      <WallsSpeak />
    </main>
  );
}
