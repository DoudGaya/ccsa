import HeroSection from "./components/home/HeroSection";
import HomeShowCaseCarousel from "./components/home/HomeShowCaseCarousel";
// import PromptGrid from "./components/home/ActivitiesComponent";
import ObjectivesComponents from "./components/home/ObjectivesComponents";
import PartnersScroll from "./components/PartnersScroll";
import { CallToAction } from "./components/CallToAction";
import HomeActivity from "./components/home/HomeActivity";
import HomeNews from "./components/home/HomeNews";
// import { getAllActivities } from "@/sanity/lib/queries";
import { getAllActivities } from "@/sanity/lib/quesries/activitiesQueries";
import { getAllArticles } from "@/sanity/lib/quesries/articleQueries";
// import { getAllArticles } from "@/sanity/lib/queries";
import { SanityTypes } from "@/@types";


export default async function Home() {

  const activities = await getAllActivities() as SanityTypes.Activity[];

  const articles = await getAllArticles() as SanityTypes.Article[];


  return (
    <main className=" flex flex-col bg-gray-100 dark:bg-black">
      <HeroSection />
      <HomeShowCaseCarousel />
      <HomeNews articles={articles} />
      <ObjectivesComponents />
      <HomeActivity activities={activities} />
      <CallToAction />
    </main>
  );
}

