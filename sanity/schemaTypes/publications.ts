import { defineField, defineType } from "sanity";

export const Publication = defineType({
    name: 'publication',
    title: 'Publication',
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
            validation: (Rule) => Rule.required(),
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
            name: 'date',
            title: 'Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
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
            name: 'file',
            title: 'File',
            type: 'file',
            options: {
                accept: '.pdf,.dotx,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,.rtf,.odt,.odp,.ods,.odg,.odf,.odc,.odb,.odm,.ott,.ots',
            },
        }),
        defineField({
            name: 'publicationType',
            title: 'Publication Type',
            type: 'reference',
            to: [{ type: 'publicationType' }],
        }),
        defineField({
            name: 'url',
            title: 'Url',
            type: 'url',
        })
    ]
})  