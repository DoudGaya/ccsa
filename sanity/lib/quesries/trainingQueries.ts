import { groq } from "next-sanity"
import { client } from "../client";


export const getAllTrainings = () => {
    const query = groq`
    *[_type == "trainings"] | order(_createdAt desc) {
        _type,
        _id,
        title,
        'slug': slug.current,
        body,
        'imageUrl': imageUrl.asset->url 
    }
    `
    return client.fetch(query, {}, { 
        next: { 
            revalidate: 60, // Revalidate every 60 seconds
            tags: ['trainings'] // Add cache tags
        } 
    })
}

export const getSingleTraining = (slug: string) => {
    const query = groq`
    *[_type == "trainings" && slug.current == $slug] {
        _type,
        _id,
        title,
        'slug': slug.current,
        body,
        'imageUrl': imageUrl.asset->url
    }[0]
    `
    return client.fetch(query, { slug }, { 
        next: { 
            revalidate: 30, // Revalidate every 30 seconds for individual trainings
            tags: ['training', `training-${slug}`] // Add specific cache tags
        } 
    })
}