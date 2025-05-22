import { groq } from "next-sanity"
import { client } from "../client";


export const revalidate = 10



export const getAllTrainings = () => {
    const query = groq`
    *[_type == "trainings"] | order(_createdAt desc) {
        _type,
        _id,
        title,
        overview,
        'slug': slug.current,
        'pedagogy': Pedagogy[],
        'learningOutcomes': learningOutcomes[],
        'curriculum': curriculum[],
        'targetAudience': targetAudience[],
        'imageUrl': images[0].asset->url,
        _createdAt,
        mandate,
        venue,
        location,
    }
    `
    return client.fetch(query)
}



export const getSingleTraining = (slug: string) => {
    const query = groq`
    *[_type == "trainings" && slug.current == $slug] {
        _type,
        _id,
        title,
        overview,
        'slug': slug.current,
        'pedagogy': Pedalogy[],
        'learningOutcomes': learningOutcomes[],
        'curriculum': curriculum[],
        'targetAudience': targetAudience[],
        'imageUrl': images[0].asset->url,
        _createdAt,
        mandate,
        venue,
        location,
    }[0]
    `
return client.fetch(query, {slug})
}