import { defineField, defineType } from "sanity";




export const partners = defineType({
    name: 'partners',
    title: 'Partners',
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
            type: 'text',
        }),
        defineField({
            name: 'partnerType',
            title: 'Partner Type',
            type: 'reference',
            to: [{ type: 'partnerType' }],
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