import { defineField, defineType } from "sanity";


export const publicationType = defineType({
    name: 'publicationType',
    title: 'Type of Publication',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
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
            name: 'descriptionLabel',
            title: 'Description Label',
            type: 'string',
            description: 'Label shown before the description on the site (e.g. "Abstract", "Summary", "Overview"). Defaults to "Description" if left blank.',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Controls how publications of this type are displayed on the site.',
            options: {
                list: [
                    { title: 'Journal', value: 'journal' },
                    { title: 'Document (policy brief, case study, project, etc.)', value: 'document' },
                    { title: 'Other', value: 'other' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'bannerImage',
            title: 'Banner Image',
            type: 'image',
            description: 'Banner image shown at the top of the publications list and single publication pages.',
            options: {
                hotspot: true,
            },
        }),
    ],
})