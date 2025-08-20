import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export default async function DebugMemberTypes() {
  try {
    // Get all member types
    const memberTypes = await client.fetch(groq`
      *[_type == "memberType"] {
        _id,
        title,
        description,
        'slug': slug.current
      }
    `);

    // Get all members
    const members = await client.fetch(groq`
      *[_type == "member"] {
        _id,
        name,
        'memberTypeSlug': memberType->slug.current
      }
    `);

    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Debug: Sanity Data</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Member Types Found:</h2>
          {memberTypes.length === 0 ? (
            <p className="text-red-600">❌ No member types found in Sanity!</p>
          ) : (
            <div className="space-y-2">
              {memberTypes.map((type: any) => (
                <div key={type._id} className="p-4 border rounded">
                  <p><strong>Title:</strong> {type.title}</p>
                  <p><strong>Slug:</strong> <code>{type.slug}</code></p>
                  <p><strong>Description:</strong> {type.description}</p>
                  <p><strong>URL:</strong> <a href={`/about/${type.slug}`} className="text-blue-600 hover:underline">/about/{type.slug}</a></p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Members Found:</h2>
          <p>Total members: {members.length}</p>
          {members.slice(0, 5).map((member: any) => (
            <div key={member._id} className="p-2 border-b">
              <p><strong>{member.name}</strong> - Member Type: <code>{member.memberTypeSlug}</code></p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Debug Error</h1>
        <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}
