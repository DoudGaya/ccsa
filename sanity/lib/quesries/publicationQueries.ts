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
        descriptionLabel,
        category,
        'bannerImage': bannerImage.asset->url,
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
        authors,
        author->{
            name,
            email,
            'slug': slug.current,
            bio,
        },
        'fileUrl': file.asset->url,
        'previewImageUrl': previewImage.asset->url,
        url,
        publicationType->{
            title,
            description,
            'slug': slug.current,
            descriptionLabel,
            category,
            'bannerImage': bannerImage.asset->url,
        }
    }
    `
    return client.fetch(query, {type})
}


export const getPublicationDetail = (typeSlug: string, itemSlug: string) => {
    const query = groq`
        *[_type == "publication" && slug.current == $itemSlug && publicationType->slug.current == $typeSlug][0] {
            _id,
            title,
            description,
            'slug': slug.current,
            authors,
            date,
            tags,
            'fileUrl': file.asset->url,
            'previewImageUrl': previewImage.asset->url,
            url,
            author->{
                name,
                email,
                'slug': slug.current,
                bio,
                'imageUrl': image.asset->url,
            },
            publicationType->{
                title,
                description,
                'slug': slug.current,
                descriptionLabel,
                category,
                'bannerImage': bannerImage.asset->url,
            }
        }
    `
    return client.fetch(query, { typeSlug, itemSlug })
}