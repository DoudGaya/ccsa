import type { SanityTypes } from "@/@types";
import { DynamicBanner } from "@/app/components/dynamics/DynamicBanner";
// import { getSingleActivity } from "@/sanity/lib/queries";
// import ArticleContents from "./_components/ArticleContents";
import { getSingleActivity } from "@/sanity/lib/quesries/activitiesQueries";
import React from "react";
import ActivityContents from "../_components/AcitivityContents";

interface Params {
  slug: string;
}

export default async function Page({
  params }: {params: Promise<Params>}) {

    const {slug}  = await params;

const activity = await getSingleActivity(slug) as SanityTypes.Activity;
  try {
    return (
      <div className="flex flex-col w-full">
        <DynamicBanner 
          title={activity.title} 
          bannerImage={activity.imageUrl} 
          description={''} 
        />
        <div className="py-6">
          <ActivityContents activity={activity} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}