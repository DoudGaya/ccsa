import { defineType } from "sanity";

export const enentType = defineType({
    name: 'event',
    title: 'Event',
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
    ],
})