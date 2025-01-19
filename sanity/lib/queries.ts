import { groq } from "next-sanity";
import { client } from "./client";



export const revalidate = 60
export const getAllActivities = () => {
    const query = groq`
    *[_type == "activity"] | order(_createdAt desc) {
        _id,
        title,
        description,
        location,
        tags,
        images,
        author->{
            name,
            email,
            slug,
            bio,
        },
        _createdAt,
        'slug': slug.current,
        'imageUrl': imageUrl.asset->url,
        activityType->{
            name,
            slug,
        }
    } 
    `
    return client.fetch(query)
}


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
    return client.fetch(query, {slug})
}


export const getSinggleActivity = (slug: string) => {
    const query = groq`
    *[_type == "activity" && slug.current == $slug] {
        _id,
        title,
        description,
        _createdAt,
        images,
        author->{
            name,
            email,
            'slug': slug.current,
            bio
        },
        tags,
        'slug': slug.current,
        'imageUrl': image.asset->url,
        'activityType': activityType->title
    }
    `
    return client.fetch(query, {slug})
}