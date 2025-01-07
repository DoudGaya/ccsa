import Image from "next/image";
import banner from '@/public/banner-2.jpg';


export default function Home() {
  return (
    <div style={{
      backgroundImage: `url(${banner.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className=" h-screen w-full bg-blue-600/80 bg-blend-overlay">
      HELLO WORLD
    </div>
  );
}
