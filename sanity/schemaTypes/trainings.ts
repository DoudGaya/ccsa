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
          
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'body',
            title: 'body',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'imageUrl',
            title: 'Image Url',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})



// export const trainings = defineType({
//     name: 'trainings',
//     title: 'Trainings',
//     type: 'document',
//     fields: [
//         {
//             name: 'title',
//             title: 'Title',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         },
//            defineField({
//                     name: 'mandate',
//                     title: 'Mandate',
//                     type: 'string',
//                 }),
//                 defineField({
//                     name: 'overview',
//                     title: 'Overview',
//                     type: 'text',
//                 }),
//                 defineField({
//                     name: 'learningOutcomes',
//                     title: 'Learning Outcomes',
//                     type: 'array',
//                     of: [{ type: 'string' }],
//                 }),
//                 defineField({
//                     name: 'curriculum',
//                     title: 'Curriculum',
//                     type: 'array',
//                     of: [{ type: 'string' }],
//                 }),
//                 defineField({
//                     name: 'Pedalogy',
//                     title: 'pedagogy',
//                     type: 'array',
//                     of: [{ type: 'string' }],
//                 }),
//                 defineField({
//                     name: 'targetAudience',
//                     title: 'Target Audience',
//                     type: 'array',
//                     of: [{ type: 'string' }],
//                 }),
//         defineField({
//             name: 'slug',
//             type: 'slug',
//             options: {
//                 source: 'title',
//                 maxLength: 96,
//             },
//         }),
//         {
//             name: 'location',
//             title: 'Location',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         },
//         defineField({
//             name: 'venue',
//             title: 'Venue',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'imageUrl',
//             title: 'Image Url',
//             type: 'image',
//             options: { hotspot: true },
//         }),
//     ],
// })
