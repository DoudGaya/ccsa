import type { SanityTypes } from "@/@types";
import { DynamicBanner } from "@/app/components/dynamics/DynamicBanner";
import { getSingleActivity } from "@/sanity/lib/queries";
import React from "react";
import ActivityContents from "../_components/AcitivityContents";
// import ArticleContents from "./_components/ArticleContents";

interface Params {
  slug: string;
}

export default async function Page({
  params }: {params: Promise<Params>}) {


    const {slug}  = await params;
    console.log(slug)

    


// consolw

const activity = await getSingleActivity(slug) 
console.log(activity)

// const article = (await getAllActivities(slug)) as SanityTypes.Article;
  try {



    // console.log('Activity:', activity)
    return (
      <div className="flex flex-col w-full">
        {/* <DynamicBanner 
          title={activity.title} 
          bannerImage={activity.imageUrl} 
          description={activity.description} 
        /> */}
        <div className="py-6">
          {/* <ActivityContents activity={activity} /> */}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Let Next.js error boundary handle this
  }
}