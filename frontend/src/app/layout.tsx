import React from 'react';
import './globals.css'; // Feltéve, hogy ez létezik

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <h1>Azta Paszta Cipő Paszta</h1>
        {children}
      </body>
    </html>
  );
}