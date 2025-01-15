import { defineType } from "sanity";


export const ArticleType = defineType({
    name: 'articleType',
    title: 'Type of Article',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }
    ],
})