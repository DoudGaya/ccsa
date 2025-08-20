import { groq } from "next-sanity"
import { client } from "../client";

export const getAllArticles = () => {
    const query = groq`
    *[_type == "article"] | order(_createdAt desc) {
        _id,
        title,
        overview,
        _createdAt,
        dateCreated,
        author->{
            name,
            email,
            'slug': slug.current,
            'imageUrl': image.asset->url,
        },
        'slug' : slug.current,
        'imageUrl': image.asset->url,
        type->{
            name,
            'slug': slug.current
        }
    } 
    `
    return client.fetch(query, {}, { 
        next: { 
            revalidate: 60, 
            tags: ['articles']
        } 
    })
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
    return client.fetch(query, { slug }, { 
        next: { 
            revalidate: 30, // Revalidate every 30 seconds for individual articles
            tags: ['article', `article-${slug}`] // Add specific cache tags
        } 
    })
}
