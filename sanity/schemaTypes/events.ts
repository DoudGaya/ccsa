import { defineField, defineType } from "sanity";

export const activity = defineType({
    name: 'activity',
    title: 'Activity',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'activityType',
            title: 'Activity Type',
            type: 'reference',
            to: [{ type: 'activityType' }],
        }),
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'imageUrl',
            title: 'Image Url',
            type: 'image',
            options: { hotspot: true },
        }),
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        }
    ],
})
