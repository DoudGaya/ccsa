
import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";
import { SanityTypes } from "@/@types";

revalidate




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
        mediaUrl,
        mediaFile,
        tags,
    }
    `

    const media = await client.fetch(query) as SanityTypes.Media[]
    return media
}