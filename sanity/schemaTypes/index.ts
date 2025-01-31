import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { article } from './article'
import { activity } from './activities'
import { activityType } from './activityType'
import { ArticleType } from './articleType'
import { Publication } from './publications'
import { publicationType } from './PublicationType'
import { member } from './member'
import { memberType } from './memberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    activityType,
    ArticleType,
    article,
    activity,
    memberType,
    member,
    Publication,
    publicationType
  ],
}
