# Research Resource Manager — PR 1: fundatie si laboratoare

Baza: Campus360-USV/Frontend. UI reproiectat dupa capturile Figma furnizate.

## Pornire
```
npm install
npm run build
npm run dev
```
Backend-ul ruleaza separat pe localhost:3000; vite.config.js redirectioneaza `/api` spre acest backend. Datele nu sunt simulate: lipsa endpointurilor afiseaza eroare vizibila.

- Login real: POST /api/login, corp { email, parola }. Conturi de test create de backendul echipei.
- Laboratoare: GET /api/laboratoare si GET /api/laboratoare/:id (PR backend #4, in curs de revizuire la verificare).
- Echipamente: GET /api/echipamente.

## Observatii
Foloseste acest ZIP ca un patch de fisiere peste un clone proaspat al repo-ului Frontend. Nu include .git, node_modules sau credentiale. Pentru al doilea PR porneste din main dupa merge-ul primului si aplica al doilea ZIP.
