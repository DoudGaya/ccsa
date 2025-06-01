import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// This should match your webhook secret in Sanity
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify webhook secret
    const headerSecret = request.headers.get('webhook-secret')
    if (headerSecret !== WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Get the document type and slug from webhook payload
    const { _type, slug } = body

    if (_type === 'article') {
      // Revalidate specific article page
      if (slug?.current) {
        revalidatePath(`/articles/${slug.current}`)
        revalidateTag(`article-${slug.current}`)
      }
      
      // Revalidate articles list
      revalidatePath('/articles')
      revalidateTag('articles')
      revalidateTag('article')

      // console.log(`Revalidated article: ${slug?.current || 'unknown'}`)
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}