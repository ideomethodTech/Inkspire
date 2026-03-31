import Hero from "@/components/sections/Hero";
import Bestseller from "@/components/sections/Bestseller";
import PosterKit from "@/components/sections/PosterKit";
import YourMood from "@/components/sections/YourMood";
import ShopWithUs from "@/components/sections/ShopWithUs";
import NewArrivals from "@/components/sections/NewArrivals";  
import Testimonials from "@/components/sections/Testimonials";
import PageWrapper from "@/components/layout/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <Bestseller />
      <PosterKit />
      <YourMood />
      <ShopWithUs />
      <NewArrivals />
      <Testimonials />
    </PageWrapper>
  );
}