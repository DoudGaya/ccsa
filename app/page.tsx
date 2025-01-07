import Image from "next/image";
import banner from '@/public/home-bannner.jpg';
import HeroSection from "./components/home/HeroSection";
import HomeShowCaseCarousel from "./components/home/HomeShowCaseCarousel";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeShowCaseCarousel />
    </main>
  );
}
