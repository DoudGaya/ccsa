import Image from "next/image";
import banner from '@/public/home-bannner.jpg';
import HeroSection from "./components/home/HeroSection";
import HomeShowCaseCarousel from "./components/home/HomeShowCaseCarousel";
// import PromptGrid from "./components/home/ActivitiesComponent";
import ObjectivesComponents from "./components/home/ActivitiesComponent";
import MissionAndVission from "./components/MissionAndVission";
import PartnersScroll from "./components/PartnersScroll";
import { CallToAction } from "./components/CallToAction";
import HomeActivity from "./components/home/HomeActivity";
import HomeNews from "./components/home/HomeNews";


export default function Home() {
  return (
    <main className=" flex flex-col bg-gray-100 dark:bg-black">
      <HeroSection />
      <HomeShowCaseCarousel />
      <HomeNews />
      <ObjectivesComponents />
      <HomeActivity />
      <PartnersScroll />
      <CallToAction />
    </main>
  );
}

