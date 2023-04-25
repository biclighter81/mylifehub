import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Header />
        <div className="flex-grow mx-8 my-8">{children}</div>
        <Footer />
      </div>
    </>
  );
}
