import { groq } from "next-sanity";
import { client } from "./client";



export const getAllActivities = () => {
    const query = groq`
    *[_type == "activity"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        _createdAt,
        'imageUrl': image.asset->url,
        'activityType': activityType->title
    }
    `
    return client.fetch(query)
}


export const getAllArticles = () => {
    const query = groq`
    *[_type == "article"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        overview,
        
        _createdAt,
        'imageUrl': image.asset->url,
        'articleType': articleType->title
    }
    `
    return client.fetch(query)
}
