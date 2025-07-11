import { groq } from "next-sanity"
import { client } from "../client";


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
        overview,
        'slug': slug.current,
        'pedagogy': Pedagogy[], // Fixed typo from Pedalogy to Pedagogy
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
    return client.fetch(query, { slug }, { 
        next: { 
            revalidate: 30, // Revalidate every 30 seconds for individual trainings
            tags: ['training', `training-${slug}`] // Add specific cache tags
        } 
    })
}