//Ide kerülnek azok a kódok amelyeket több oldalon me kell majd jeleníteni például a header és a footer
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <Navbar/>
        <main>{children}</main>
        <Footer />
      </div>
    );
  }