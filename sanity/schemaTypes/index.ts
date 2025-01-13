import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { activityType } from './activities'
import { newsType } from './news'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    activityType,
    newsType,
  ],
}
