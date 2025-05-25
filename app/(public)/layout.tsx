
// import Navbar from "./components/Navbar";
// import Footer from "./components/footer";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";


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
    </div>
  );
}
