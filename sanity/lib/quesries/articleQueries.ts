


import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";

revalidate


export const getAllArticles = () => {
    const query = groq`
    *[_type == "article"] | order(_createdAt desc) {
        _id,
        title,
        overview,
        _createdAt,

        author->{
            name,
            email,
            'slug': slug.current,
        },
        'slug' : slug.current,
        'imageUrl': image.asset->url,
        type->{
            name,
            'slug': slug.current
        }
    } 
    `
    return client.fetch(query)
}

 
export const getSingleArticle = (slug: string) => {
    
    const query = groq`
    *[_type == "article" && slug.current == $slug] {
        _id,
        title,
        overview,
        _createdAt,
        dateCreated,
        body,
        tags,
        author->{
            name,
            email,
            designation,
            'slug': slug.current,
            bio,
            'imageUrl': image.asset->url,
        },
        'slug' : slug.current,
        'imageUrl': image.asset->url,
        type->{
            name,
            'slug': slug.current
        }
    }[0]
    `
    return client.fetch(query, {slug})
}
