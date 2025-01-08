import Image from "next/image";
import banner from '@/public/home-bannner.jpg';
import HeroSection from "./components/home/HeroSection";
import HomeShowCaseCarousel from "./components/home/HomeShowCaseCarousel";
import PromptGrid from "./components/home/PromptGrid";
import MissionAndVission from "./components/MissionAndVission";


export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <MissionAndVission /> */}
      <HomeShowCaseCarousel />
      <PromptGrid />
    </main>
  );
}

