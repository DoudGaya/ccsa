import { groq } from "next-sanity";
import { client } from "../client";
import { revalidate } from "../queries";


revalidate


export const getPublicationByType = (type: string) => {
    const query = groq`
    *[_type == "publicationType" && slug.current == $type] | order(_createdAt desc) {
        _id,
        title,
        description,
        'slug' : slug.current,
    }[0]
    `
    return client.fetch(query, {type})
}



export const getAllPublicationByType = (type: string) => {
    const query = groq`
       *[_type == "publication" && publicationType->slug.current == $type] | order(_createdAt desc) {
        _id,
        title,
        description,
        'slug' : slug.current,
        author->{
            name,
            email,
            'slug': slug.current,
            bio,
        },
        'fileUrl': file.asset->url,
        url,
        publicationType->{
            title,
            description,
            'slug': slug.current
        }
    }
    `
    return client.fetch(query, {type})
}