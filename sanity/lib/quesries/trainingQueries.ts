import { groq } from "next-sanity"
import { client } from "../client";


export const revalidate = 10



const getAllTrainings = () => {
    const query = groq`
    *[_type == "trainings"] | order(_createdAt desc) {
        _id,
        title,
        description,
        'slug': slug.current,
        startDate,
        location,
        venue,
        _createdAt,
        images,
        'imageUrl': imageUrl.asset->url,
    }
    `
    return client.fetch(query)
}




export const getSingleTraining = (slug: string) => {
    const query = groq`
    *[_type == "trainings" && slug.current == $slug] {
        _id,
        title,
        description,
        'slug': slug.current,
        startDate,
        location,
        venue,
        _createdAt,
        images,
        'imageUrl': imageUrl.asset->url,
    }[0]
    `
return client.fetch(query, {slug})
}