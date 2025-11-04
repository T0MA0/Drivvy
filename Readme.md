# Drivvy - Peer-to-Peer Autómegosztó Platform

Üdv a Drivvy projektben! Ez egy teljeskörű (full-stack) webalkalmazás, ami egy peer-to-peer autómegosztó szolgáltatást valósít meg. A felhasználók feltölthetik saját autóikat, amiket más regisztrált felhasználók kibérelhetnek.

* **Frontend:** Egy Next.js (App Router) alkalmazás, ami a felhasználói felületet biztosítja.
* **Backend:** Egy Django REST Framework API, ami az adatbázist, az üzleti logikát és a felhasználói hitelesítést kezeli.

## Fő Funkciók

* **Felhasználói fiókok:** Regisztráció, bejelentkezés (JWT alapú), profilkezelés.
* **Autókezelés:** Felhasználók feltölthetik saját autóik adatait és képeit.
* **Admin felület:** Az autók feltöltés után adminisztrátori jóváhagyásra várnak.
* **Keresés és listázás:** Részletes keresés hely, dátum és kategória alapján.
* **Foglalási rendszer:** Dátumválasztóval integrált foglalási folyamat.
* **Fizetés:** Online fizetés Stripe integrációval.
* **Értékelések:** Felhasználók értékelhetik a bérbeadókat és az autókat a foglalás után.

---
## Technológiai Stack

### Frontend (Next.js)
* **Framework:** Next.js 14+ (App Router)
* **Nyelv:** TypeScript
* **Stílus:** Tailwind CSS
* **HTTP Kliens:** Fetch API / Axios

### Backend (Django)
* **Framework:** Django 5.x
* **API:** Django REST Framework (DRF)
* **Adatbázis:** MySQL
* **Hitelesítés:** Django REST Framework Simple JWT (JSON Web Tokens)
* **Fizetés:** Stripe Python SDK
* **Egyéb:** `django-cors-headers` (CORS kezelés), `Pillow` (képkezelés)

---
