// "use client"

// import { useEffect, useRef } from "react"
// import mapboxgl from "mapbox-gl"
// import "mapbox-gl/dist/mapbox-gl.css"

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

// export default function Map() {
//   const mapContainer = useRef<HTMLDivElement>(null)
//   const map = useRef<mapboxgl.Map | null>(null)

//   useEffect(() => {
//     if (map.current) return // initialize map only once
//     if (!mapContainer.current) return // wait for map container to be ready

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [7.4675, 9.0843], // Longitude, Latitude
//       zoom: 12,
//     })

//     // Add navigation control (zoom buttons)
//     map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

//     // Add marker
//     new mapboxgl.Marker().setLngLat([7.4675, 9.0843]).addTo(map.current)

//     // Clean up on unmount
//     return () => map.current?.remove()
//   }, [])

//   return <div ref={mapContainer} className="w-full h-full" />
// }

