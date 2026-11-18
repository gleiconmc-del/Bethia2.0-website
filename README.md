# BETHIA 2.0 · Web oficial

Sitio estático (HTML + CSS + JS). No necesita compilación ni dependencias.

## Estructura
- `index.html` página principal
- `css/styles.css`, `js/main.js` estilos y lógica
- `aviso-legal.html`, `privacidad.html`, `cookies.html` plantillas legales por completar
- `404.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `vercel.json`

## Antes de publicar con dominio propio
1. Sustituye `TU-DOMINIO.vercel.app` por tu dominio real en `index.html`, `robots.txt` y `sitemap.xml`.
2. Completa los textos legales y elimina su etiqueta `noindex`.
3. Añade Meta Pixel / Google Analytics en `loadTrackers()` de `js/main.js` (solo se cargan con consentimiento).

## Despliegue
Vercel: Add New Project → importar el repositorio → Framework Preset "Other" → Deploy.
