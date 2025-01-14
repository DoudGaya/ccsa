import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { newsType } from './news'
import { activity } from './activities'
import { activityType } from './activityType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    newsType,
    activity,
    activityType,
  ],
}
