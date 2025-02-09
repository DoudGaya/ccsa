import { defineField, defineType } from "sanity";


export const mediaSchema = defineType({
    name: 'media',
    title: 'Media',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'mediaType',
            title: 'Type',
            type: 'reference',
            to: [{ type: 'mediaType' }],
        }),
        defineField({
            name: 'video',
            title: 'Video',
            type: 'url',    
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        })
    ]
})