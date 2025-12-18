// Querying with "sanityFetch" will keep content automatically updated
// In next-sanity v12, use the new live content approach
// See: https://github.com/sanity-io/next-sanity for more information.
import { client } from './client'

// For now, export a simple fetch function
// You can enable live content later with @sanity/preview-kit if needed
export const sanityFetch = client.fetch.bind(client)

// Placeholder for SanityLive component (not used in v12 basic setup)
export const SanityLive = () => null
