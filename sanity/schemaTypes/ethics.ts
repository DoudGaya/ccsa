import { defineField, defineType } from "sanity";


export const ethics = defineType({
    name: 'ethics',
    title: 'Ethics',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'ethicsType',
            title: 'Ethics Type',
            type: 'string',
            // to: [{ type: 'ethicsType' }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'typeSlug',
            type: 'slug',
            options: {
                source: 'ethicsType',
                maxLength: 96,
            },
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