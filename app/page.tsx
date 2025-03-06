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
import UpcomingEvents from "./components/home/UpcomingEvents";
import { getAllEvents } from "@/sanity/lib/quesries/eventQueries";
import { EventList } from "@/components/home/event-list";


export default async function Home() {

  const activities = await getAllActivities() as SanityTypes.Activity[];

  const articles = await getAllArticles() as SanityTypes.Article[];

  const e = await getAllEvents() as SanityTypes.Events[];


  return (
    <main className=" flex flex-col bg-gray-100 dark:bg-black">
      <HeroSection />
      <HomeShowCaseCarousel />
      <HomeNews articles={articles} />
      <ObjectivesComponents />
      {/* <HomeActivity activities={activities} /> */}
     <div className=" max-w-7xl mx-auto px-4 py-8 w-full ">
    
     </div>
      <UpcomingEvents e={e} />
      <CallToAction />
    </main>
  );
}

