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
import ActivityGrid from "./activities/_components/ActivityGrid";


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

      <UpcomingEvents e={e} />
      {/* <div className=" w-full h-[70vh] bg-gray-100 dark:bg-black flex flex-col"> */}
      <HomeActivity activities={activities} />
      {/* </div> */}
     {/* <div className=" bg-gray-200 space-y-4  mx-auto flex flex-col px-4 py-8 w-full ">
      <div className=" max-w-7xl mx-auto">
        <div className=" flex items-start text-start underline">
        <h2 className=" text-3xl font-semibold py-6 text-center">Activities</h2>
        </div>
      <ActivityGrid activities={activities} />
      </div>
     </div> */}
      <CallToAction />
    </main>
  );
}

