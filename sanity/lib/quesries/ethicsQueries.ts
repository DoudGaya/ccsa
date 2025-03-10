
import { groq } from "next-sanity"
import { client } from "../client";
import { revalidate } from "../queries";

revalidate





export const getWorkEthics = async (slug: string) => {
  const query = groq`*[_type == "ethics" && typeSlug.current == 'work-ethics'] | order(publishedAt desc) {
    _id,
    title,
    slug,
    body
  }[0]`;
   return client.fetch(query, {slug})
};

