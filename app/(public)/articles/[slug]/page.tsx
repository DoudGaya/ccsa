import type { SanityTypes } from "@/@types";
import { DynamicBanner } from "@/app/components/dynamics/DynamicBanner";
// import { getSingleArticle } from "@/sanity/lib/queries";
import { getSingleArticle } from "@/sanity/lib/quesries/articleQueries";
import React from "react";
import ArticleContents from "./_components/ArticleContents";

interface PageProps {
  slug: string;
}

export default async function Page({
  params }: {params: Promise<PageProps>}) {
  const { slug } = await params
  

  try {
    const article = (await getSingleArticle(slug)) as SanityTypes.Article;
    return (
      <div className="flex flex-col w-full">
        <DynamicBanner 
          title={article.title} 
          bannerImage={article.imageUrl} 
          description={article.overview} 
        />
        <div className="py-6">
          <ArticleContents article={article} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; 
  }
}
