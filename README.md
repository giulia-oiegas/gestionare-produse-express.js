# 🛍️ Aplicație Gestiune Produse (Node.js & MySQL)

O aplicație web completă pentru gestionarea stocurilor de produse, dezvoltată folosind arhitectura MVC. Aplicația permite utilizatorilor să își creeze conturi, să se autentifice și să efectueze operațiuni CRUD (Create, Read, Update, Delete) asupra bazei de date.

---

## 🛠️ Tehnologii Utilizate

Acest proiect a fost construit folosind următorul stack tehnologic:

### Backend (Server-Side)
* **Node.js:** Mediul de execuție (Runtime) care permite rularea JavaScript pe server.
* **Express.js:** Framework-ul web folosit pentru gestionarea rutelor, middleware-urilor și logicii serverului.
* **MySQL:** Sistemul de gestiune a bazei de date relaționale.
* **Passport.js:** Middleware pentru autentificare sigură.
* **Bcrypt:** Bibliotecă pentru criptarea parolelor utilizatorilor.

### Frontend (Client-Side)
* **EJS (Embedded JavaScript):** Motor de șabloane pentru randarea dinamică a paginilor HTML.
* **CSS3 Custom:** Stilizare avansată (Glassmorphism, gradiente, animații) pentru o interfață modernă.

---

## 📚 Ce am învățat dezvoltând acest proiect?

Lucrând la acest proiect cu **Express.js**, am aprofundat următoarele concepte cheie:

### 1. Arhitectura MVC (Model-View-Controller)
Am învățat să separ logica aplicației pentru a menține codul curat:
* **Model:** Structura bazei de date (MySQL).
* **View:** Interfața cu utilizatorul (fișierele `.ejs`).
* **Controller:** Logica din spatele rutelor (fișierul `routes/index.js`).

### 2. Rutare și Metode HTTP
Am înțeles diferența și utilizarea metodelor HTTP în Express:
* `app.get()`: Pentru a afișa pagini sau a cere date.
* `app.post()`: Pentru a trimite date securizat (din formulare de Login sau Adăugare Produs).

### 3. Middleware
Am învățat cum funcționează funcțiile Middleware în Express (funcții care se execută între primirea cererii și trimiterea răspunsului):
* `express.static()`: Pentru a servi fișiere CSS/imagini.
* `express.urlencoded()`: Pentru a citi datele trimise prin formulare (`req.body`).
* **Auth Middleware:** Crearea funcției `isLoggedIn()` pentru a proteja paginile private (dashboard-ul nu poate fi accesat fără login).

### 4. Gestionarea Bazei de Date (Async/Await)
Am lucrat cu pachetul `mysql2` folosind **Promises** și **Async/Await** pentru a gestiona conexiunile la baza de date într-un mod non-blocant, specific Node.js.

---

## 🚀 Cum se rulează proiectul

1.  **Instalare dependențe:**
    Deschide terminalul în folderul proiectului și rulează:
    ```bash
    npm install
    ```

2.  **Configurare Bază de Date:**
    * Deschide XAMPP/WAMP și pornește MySQL.
    * Creează o bază de date numită `gestionare_produse`.
    * Importă tabelele `users` și `products`.

3.  **Pornire Server:**
    ```bash
    node app.js
    ```

4.  **Accesare:**
    Deschide browserul la adresa: `http://localhost:3000`

---

## 📂 Structura Proiectului

```text
ProiectNode/
├── app.js               # Punctul de intrare (Serverul)
├── db.js                # Conexiunea la MySQL
├── routes/
│   └── index.js         # Toate rutele aplicatiei
└── views/               # Pagini EJS (Home, Login, Dashboard)
