import { defineField, defineType } from "sanity";

export const member = defineType({
    name: 'member',
    title: 'Member',
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
        },
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'facebook',
            title: 'Facebook',
            type: 'string',
        }),
        defineField({
            name: 'twitter',
            title: 'Twitter',
            type: 'string',
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn',
            type: 'string',
        }),
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        defineField({
            name: 'memberType',
            title: 'Type of Member',
            type: 'reference',
            to: [{ type: 'memberType' }],
        }),
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
        },
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        })
        
    ],
})