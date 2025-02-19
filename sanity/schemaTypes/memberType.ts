import { defineType, defineField } from "sanity";


export const memberType = defineType({
    name: 'memberType',
    title: 'Type of Member',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }
    ],
})