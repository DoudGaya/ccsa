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


export const getSingleMemberType = (type: string) => {
    const query = groq`
    *[_type == "memberType" && slug.current == $type] | order(_createdAt desc) {
        _id,
        title,
        description,
        'slug' : slug.current,
    }[0]
    `
    return client.fetch(query, {type})
}


export const getAllMemberType = (type: string) => {
    const query = groq`
    *[_type == "member" && memberType->slug.current == $type] | order(_createdAt desc) {
        _id,
        name,
        email,
        role,
        facebook,
        twitter,
        linkedin,
        'slug' : slug.current,
        bio,
        'imageUrl': image.asset->url,
        memberType->{
            title,
            description,
            'slug': slug.current
        }
    }
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
        publicationType->{
            title,
            description,
            'slug': slug.current
        }
    }
    `
    return client.fetch(query, {type})
}


export const getSingleArticle = (slug: string) => {
    
    const query = groq`
    *[_type == "article" && slug.current == $slug] {
        _id,
        title,
        overview,
        _createdAt,
        body,
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
    const data = client.fetch(query, {slug})

    console.log('Data:', data)
}