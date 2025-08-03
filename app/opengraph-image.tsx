import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Centre for Climate-Smart Agriculture (CCSA) - Cosmopolitan University Abuja'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
         style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          fontFamily: 'Inter, sans-serif'
          ,
        }}
        >CCSA</p>
         <p>Cosmopolitan University Abuja</p>
      </div>
    ),
    {
      ...size,
    }
  )
}

