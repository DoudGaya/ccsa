import { defineField, defineType } from "sanity";

export const activityType = defineType({
    name: 'activity',
    title: 'Activity',
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
                name: 'date',
                title: 'Date',
                type: 'datetime',
                validation: (Rule) => Rule.required(),
        }),
        defineField({
                    name: 'location',
                    title: 'Location',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
        }),
    ],    
})