# Drivvy - Peer-to-Peer Autómegosztó Platform

Üdv a Drivvy projektben! Ez egy teljeskörű (full-stack) webalkalmazás, ami egy peer-to-peer autómegosztó szolgáltatást valósít meg. A felhasználók feltölthetik saját autóikat, amiket más regisztrált felhasználók kibérelhetnek.

* **Frontend:** Egy Next.js (App Router) alkalmazás, ami a felhasználói felületet biztosítja.(Ezen a mappán belül tartozik egy readme ami elmondja hogy kell buildelni vagyis megnézni hogy hogyan nézki a weboldal.)
* **Backend:** Egy Django REST Framework API, ami az adatbázist, az üzleti logikát és a felhasználói hitelesítést kezeli.

## Next.js használata:
A next.js egy keretrendszer, amely megkönnyíti a react alapú user interfacek fejlesztését. React hiányoságait oldaja meg és megkönnyyíti az útválasztást. 
* Src vagy más néven source nevezetű mappában találhatóak a web oldalhoz szükséges mappák, és a mappákhoz tartozó fájlok.
  * app:
    * auth: Ebben a mappában találhatóak a bejelentkezéshez és a regisztrációhoz tartozó fájlok amelyek az oldalak kódját tartaémazzák
    * main: Ebben a mappában találhatóak a web alkalmazás oldalai, mappákba rendezve a könnyű karbantarthatóság szempontjából.
    * page.tsx: Ez egy fájl ami a fő oldal vagyis a homepage kódját tartalmazza.
    * Layout.tsx: Ez a mainen belül található fájl becsomagolja a page.tsx fájl(homepage) és hozzá adja a header és a footert amit egy a komponens nevezetű fájlban hoztunk létre.
  * components:
    * navbar.tsx: ez a fájl tartalmaza a navbar elemeket amit több oldal is használni fog ezért lett külön létrehozzva.
    * footer.tsx: ez a fájl tartalmazza a footer elemeket --//--.
  * lib:
    * api.ts: Ez a fájl segítségével fogjuk majd összekötni a frontendet és a backendet.       

## Django használata:
...


## Fő Funkciók

* Felhasználói fiókok: Regisztráció, bejelentkezés, profilkezelés.
* Autókezelés: Felhasználók feltölthetik saját autóik adatait és képeit.
* Admin felület: Az autók feltöltés után adminisztrátori jóváhagyásra várnak.
* Keresés és listázás: Részletes keresés hely, dátum és kategória alapján.
* Foglalási rendszer: Dátumválasztóval integrált foglalási folyamat.
* Fizetés: Online fizetés Stripe integrációval.
* Értékelések: Felhasználók értékelhetik a bérbeadókat és az autókat a foglalás után.


## Technológiai Stack

### Frontend (Next.js)
* Framework: Next.js 15+
* Nyelv: React, Typescript, Html
* Stílus: Tailwind CSS
* HTTP Kliens: Fetch API / Axios

### Backend (Django)
* Framework: Django 5.2.7
* API: Django REST Framework (DRF)
* Adatbázis: MySQL
* Hitelesítés: Django REST Framework Simple JWT
* Fizetés: Stripe Python SDK
* Egyéb: `django-cors-headers` (CORS kezelés), `Pillow` (képkezelés)

