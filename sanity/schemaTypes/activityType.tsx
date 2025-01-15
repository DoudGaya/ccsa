import { defineField, defineType } from "sanity";


export const activityType = defineType({
    name: 'activityType',
    title: 'Type of Activity',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        })
    ],
})