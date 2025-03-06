
import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";
import { SanityTypes } from "@/@types";

revalidate





export const getAllEvents = async () => {
    const query = groq`
        *[_type == "events"] | order(_createdAt asc)
    `
    const media = await client.fetch(query) as SanityTypes.Events[]
    return media
}


export const getSingleEvents = async (slug: string) => {
    const query = groq`
    *[_type == "events" && slug.current == $slug] [0]
    `
    const media = await client.fetch(query, {slug}) as SanityTypes.Events
    return media
}