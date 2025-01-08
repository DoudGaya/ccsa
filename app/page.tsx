import Image from "next/image";
import banner from '@/public/home-bannner.jpg';
import HeroSection from "./components/home/HeroSection";
import HomeShowCaseCarousel from "./components/home/HomeShowCaseCarousel";
import PromptGrid from "./components/home/ActivitiesComponent";
import MissionAndVission from "./components/MissionAndVission";
import PartnersScroll from "./components/PartnersScroll";
import { CallToAction } from "./components/CallToAction";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeShowCaseCarousel />
      <PromptGrid />
      <PartnersScroll />
      <CallToAction />
    </main>
  );
}

