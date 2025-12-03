"use client";

import Link from 'next/link';
import style from "./header.module.css"; // Ellenőrizd az útvonalat!
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // A globális állapot

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // Adatok a Contextből
  const [isHidden, setIsHidden] = useState<boolean>(false);
  // ==============================================

  // === LOGIKA: GÖRGETÉS FIGYELÉSE ===
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <header className={style.topbar} style={{ 
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)'}}>
        <div className={`container ${style.topbar__inner}`}>
          
          {/* LOGÓ */}
          <div className={style.brand}>
            <Link href="/">            
              <Image 
                src="/Logo.png"
                alt="Drivvy_logó"
                width={515}
                height={100}
                className={style.brand__logo}
                priority
              />
            </Link>
          </div>
          
          {/* MENÜRENDSZER */}
          <nav className={style.nav}>
            {/* Állandó linkek */}
            <Link href="/#kapcsolat">Kapcsolat</Link>
            <Link href="/#about-us">Rólunk</Link>
            <Link href="/#how-it-works">Hogyan működik?</Link>

            {/* === 3. LOGIKA: FELHASZNÁLÓI ÁLLAPOT === */}
            {user ? (
              // HA BE VAN JELENTKEZVE:
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/profil" className="btn btn--primary">
                  Fiók
                </Link>

                {/* KIJELENTKEZÉS (Áttetsző) */}
                <button 
                    onClick={logout} 
                    className="btn btn--ghost"
                >
                  Kijelentkezés
                </button>
              </div>
            ) : (
              // HA NINCS BEJELENTKEZVE (ALAPÁLLAPOT):
              <>
                {/* BEJELENTKEZÉS (Áttetsző) */}
                <Link href={`/bejelentkezes?callbackUrl=${pathname}`} className="btn btn--ghost">
                  Bejelentkezés
                </Link>
                
                {/* REGISZTRÁCIÓ (Zöld) */}
                <Link href="/regisztracio" className="btn btn--primary">
                  Regisztráció
                </Link>
              </>
            )}
          </nav>

          {/* MOBIL MENÜ GOMB */}
          <button className={style.nav__toggle} aria-label="Menü megnyitása">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
  );
};