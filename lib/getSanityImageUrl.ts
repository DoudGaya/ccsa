import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/lib/client"
// import { client } from "./sanityClient"

const builder = imageUrlBuilder(client)

export function getSanityImageUrl(source: any) {
  return builder.image(source).url()
}

