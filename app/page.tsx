import Image from "next/image";
import banner from '@/public/home-bannner.jpg';
import HeroSection from "./components/home/HeroSection";
import HomeShowCaseCarousel from "./components/home/HomeShowCaseCarousel";
import PromptGrid from "./components/home/PromptGrid";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeShowCaseCarousel />
      <div className="">
        <PromptGrid />
      </div>
    </main>
  );
}
