
import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";
import { SanityTypes } from "@/@types";

revalidate




export const getMediaTypeBySlug = async (slug: string) => {
    const query = groq`
    *[_type == "mediaType" && slug.current == $slug] | order(_createdAt desc) {
        _id,
        title,
        description,
        'slug' : slug.current,
    }[0]
    `
    return client.fetch(query, {slug})
}


export const getAllMediaByType = async (slug: string) => {
    const query = groq`
        *[_type == "media" && mediaType->slug.current == $slug ] | order(_createdAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        description,
        slug,
        mediaType,
        images,
        video,
        tags,
     }
    `
    const media = await client.fetch(query, {slug}) as SanityTypes.Media[]
    return media
}


export const getAllMediaTypes = async () => {
   const queries =  groq`
    *[_type == 'mediaType'] {
        title,
        description,
        'slug': slug.current
    }`

    const mediaType = await client.fetch(queries)
}

export const getAllMedia = async () => {
    const query = groq`
    *[_type == "media"] | order(_createdAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        description,
        slug,
        mediaType,
        mediaType,
        images,
        video,
        tags,
    }
    `

    const media = await client.fetch(query) as SanityTypes.Media[]
    return media
}


export const getSingleMedia = async (slug: string) => {
    const query = groq`
    *[_type == "media" && slug.current == $slug] {
        _id,
        _createdAt,
        _updatedAt,
        title,
        description,
        slug,
        mediaType,
        images,
        video,
        tags,
    }[0]
    `
    const media = await client.fetch(query, {slug}) as SanityTypes.Media
    return media
}