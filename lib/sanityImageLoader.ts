import type { ImageLoader } from 'next/image'

const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  // Handle local imports (starting with /_next/static)
  if (src.startsWith('/_next/') || src.startsWith('/static/')) {
    return src
  }
  
  // Handle relative paths and local files
  if (!src.startsWith('http')) {
    return src
  }
  
  // If it's already a Sanity CDN URL with parameters, return as is
  if (src.includes('cdn.sanity.io') && src.includes('?')) {
    return src
  }
  
  // If it's a Sanity CDN URL without parameters, add them
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', (quality || 75).toString())
    url.searchParams.set('auto', 'format')
    return url.toString()
  }
  
  // For other external images, return as is
  return src
}

export default sanityImageLoader
