import HeroSection from "../components/home/HeroSection";
import HomeShowCaseCarousel from "../components/home/HomeShowCaseCarousel";
// import PromptGrid from "./components/home/ActivitiesComponent";
import ObjectivesComponents from "../components/home/ObjectivesComponents";
import PartnersScroll from "../components/PartnersScroll";
import { CallToAction } from "../components/CallToAction";
import HomeActivity from "../components/home/HomeActivity";
import HomeNews from "../components/home/HomeNews";
// import { getAllActivities } from "@/sanity/lib/queries";
import { getAllActivities } from "@/sanity/lib/quesries/activitiesQueries";
import { getAllArticles } from "@/sanity/lib/quesries/articleQueries";
// import { getAllArticles } from "@/sanity/lib/queries";
import { SanityTypes } from "@/@types";
import UpcomingEvents from "../components/home/UpcomingEvents";
import { getAllEvents } from "@/sanity/lib/quesries/eventQueries";
import { EventList } from "@/components/home/event-list";
import ActivityGrid from "./activities/_components/ActivityGrid";
import ChinaProgramSection from "@/components/ChinaProgramSection";
import { ArticlesList } from "./news-and-events/_components/ArticlesList";
import MandateAreas from "../components/home/MandateAreas";

export default async function Home() {
  const activities = await getAllActivities() as SanityTypes.Activity[];
  const articles = await getAllArticles() as SanityTypes.Article[];
  const e = await getAllEvents() as SanityTypes.Events[];


    const news = articles.filter(article => article.type?.slug === 'news')
  
    const events = await getAllEvents() as SanityTypes.Events[]

  
  return (
    <main className=" flex flex-col bg-brand/10 dark:bg-black">
      <HeroSection />
      <HomeShowCaseCarousel />
      <ChinaProgramSection />
      <MandateAreas />
      {/* <HomeNews articles={articles} /> */}

      <div className=" container mx-auto px-4 py-8 w-full">
         {
                    news.length > 0 && (
                      <div className=" text-6xl font-main font-bold flex flex-col space-y-6 mx-auto px-4 py-8 w-full ">
                          <div className=" text-6xl font-main font-bold ">News</div>
                          <ArticlesList articles={news} />
                      </div>
                    )
        }
      </div>
      <ObjectivesComponents />
      <UpcomingEvents e={e} />
      <HomeActivity activities={activities} />
      <CallToAction />
    </main>
  );
}

