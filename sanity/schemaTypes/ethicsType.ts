import { defineField, defineType } from "sanity";


export const ethicsTypes = defineType( {
    name: 'ethicsType',
    title: 'Ethics Types',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'contents',
            title: 'Contents',
            type: 'array',
            of: [{ type: 'block' }],
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