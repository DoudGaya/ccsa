import { defineQuery } from "next-sanity";



export const activityQuery = defineQuery(
    `*[_type == "activity"] | order(date desc) {
        _id,}[0...3] {} `
)