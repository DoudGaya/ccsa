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
            name: 'description',
            title: 'Description',
            type: 'string',
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