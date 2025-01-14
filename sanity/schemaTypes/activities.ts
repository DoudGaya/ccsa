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
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'heroImmage',
            title: 'Hero Image',
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
