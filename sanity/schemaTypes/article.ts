import { defineField, defineType } from "sanity";

export const article = defineType({
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'dateCreated',
            title: 'Date Created',
            type: 'datetime',
            readOnly: true,
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm:ss',
            },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            }, 
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'reference',
            to: [{ type: 'articleType' }],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
        })
    ],
})