import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full bg-gray-800 p-4 text-white text-center">
      <h1 className="text-xl font-bold">
        Ez itt a Teszt Fejléc (Navbar)
      </h1>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-blue-300">Főoldal</Link>
        <Link href="/login" className="hover:text-blue-300">Bejelentkezés</Link>
      </nav>
    </header>
  );
};

export default Navbar;