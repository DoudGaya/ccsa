
// import Navbar from "./components/Navbar";
// import Footer from "./components/footer";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import AgriChatbot from "@/components/AgriChatbot";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
        <Navbar />
        {children}
        <Footer />
        <AgriChatbot />
    </div>
  );
}
