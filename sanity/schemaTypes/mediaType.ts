import { defineType, defineField } from "sanity";


export const mediaType = defineType({
    name: 'mediaType',
    title: 'Type of Media',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
        })
    ]
})