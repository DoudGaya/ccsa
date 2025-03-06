import { defineField, defineType } from "sanity";

export const trainings = defineType({
    name: 'trainings',
    title: 'Trainings',
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
            name: 'startDate',
            title: 'Start Date',
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
            name: 'venue',
            title: 'Venue',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'imageUrl',
            title: 'Image Url',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})
