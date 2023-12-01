import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BlobBg from "@/components/BlobBg";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden relative">
        <BlobBg />
        {children}
      </main>
      <Footer />
    </>
  );
}
