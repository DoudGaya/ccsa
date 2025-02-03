import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";

revalidate

export const getSingleActivity = (slug: string) => {
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
            designation,
            'slug': slug.current,
            bio,
            'imageUrl': image.asset->url,
        },
        tags,
        'slug': slug.current,
        'imageUrl': imageUrl.asset->url,
        'activityType': activityType->title
    }[0]
    `
return client.fetch(query, {slug})
}
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
            'slug': slug.current,
          'imageUrl': image.asset->url,
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