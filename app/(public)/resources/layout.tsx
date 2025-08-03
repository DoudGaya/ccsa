
import RootLayout from "../../layout";
import { MediaBanner } from "./_componentss/MediaBanner";
 
 export default function MediaLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
    <>
    <RootLayout>
         {children}
    </RootLayout>
    </>
   );
 }
 