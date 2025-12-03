import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Drivvy - Autóbérlés",
  description: "Bérelj autót egyszerűen Győrben",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>
<<<<<<< HEAD
        <AuthProvider>
             {children}
        </AuthProvider>
=======
        {children}
>>>>>>> refs/remotes/origin/main
      </body>
    </html>
  );
}
