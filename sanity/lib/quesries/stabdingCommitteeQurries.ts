
import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";
import { SanityTypes } from "@/@types";


export const getAllStandingCommittee = async () => {
    const query = groq`
        *[_type == "standingCommittee"] | order(_createdAt asc)
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
