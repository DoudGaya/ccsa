import { defineType } from "sanity";

export const authorType = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            type: 'slug',
        }
    ],
})