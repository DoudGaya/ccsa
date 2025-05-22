
import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";
import { SanityTypes } from "@/@types";


revalidate

export const getAllStandingCommittee = async () => {
    const query = groq`
        *[_type == "standingCommittee"] {
            title,
            description,
            'slug': slug.current
        } | order(_createdAt asc)
    `
    const media = await client.fetch(query) as SanityTypes.StandingCommitteeType[]
    return media
}


export const getSingleStandingCommittee = async (slug: string) => {
    const query = groq`
    *[_type == "standingCommittee" && slug.current == $slug] [0]
    `
    const media = await client.fetch(query, {slug}) as SanityTypes.StandingCommitteeType
    return media
}
