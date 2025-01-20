import { defineField, defineType } from "sanity";

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
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'designation',
            title: 'Designation',
            type: 'string',
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        })
        
    ],
})