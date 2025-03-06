import { defineField, defineType } from "sanity";

export const innovation = defineType({
    name: 'innovation',
    title: 'Innovation Hub',
    type: 'document',
    fields: [
        {
            name: 'title',
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