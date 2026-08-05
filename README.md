# OpenLinks 🚀

**OpenLinks** es un template de Astro completamente impulsado por JSON para crear páginas de links con enfoque DevOps: todo el contenido vive en `OpenLinks.json` y los flujos de GitHub Actions están diseñados para practicar pipelines modernos.

---

## Project Structure (Updated)

```text
/
├── OpenLinks.json          # Config principal (perfil, links, tema, etc.)
├── themes.ts               # Temas disponibles y estilos por tema
├── src/
│   ├── components/         # Componentes Astro reutilizables
│   ├── layouts/            # Layout principal
│   ├── lib/                # Utilidades (getTheme)
│   ├── pages/              # Páginas Astro
│   └── styles/             # Tailwind y estilos globales
├── public/                 # Íconos, fuentes y assets estáticos
├── .github/workflows/
│   ├── ci.yml              # Higiene de dependencias
│   ├── validate.yml        # Lint y type-check en PRs
│   ├── deploy.yml          # Build + deploy a Vercel
│   └── codeql.yml          # Escaneo de seguridad CodeQL
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## Workflow Pipelines (DevOps Practice)

Estos flujos YML están pensados para ejercitar un ciclo Dev → QA → Prod, con controles y despliegues automatizados:

### `.github/workflows/validate.yml` — PR linting & type safety
- **Trigger:** `pull_request` hacia `dev`, `qas` o `main`.
- **Configuración:** Node 20 con caché de npm.
- **Tests:** `npm run lint` aplica ESLint y `npm run check` ejecuta `astro check` + type-checking. Ambos deben pasar antes de fusionar, garantizando calidad del código.

### `.github/workflows/ci.yml` — Dependency hygiene
- **Trigger:** `pull_request` hacia `dev`, `qas` o `main`.
- **Pasos clave:** `npm ci` instala dependencias limpias, `npm outdated` lista paquetes obsoletos y `npm audit --audit-level=high` detecta vulnerabilidades importantes. Aunque no falla el pipeline, entrega visibilidad continua de deuda técnica.

### `.github/workflows/deploy.yml` — Build & Vercel promotion
- **Trigger:** `push` a `qas` o `main`.
- **Job `build`:** instala dependencias (Node 20) y corre `npm run build` para asegurar que el bundle sea válido.
- **Job `deploy`:** depende de `build`, vuelve a compilar para entorno limpio, instala Vercel CLI y despliega usando los secretos `VERCEL_TOKEN`, `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`. El `environment` se asigna automáticamente (`qas` o `prd`) según la rama y los despliegues de `main` usan `vercel --prod`.

### `.github/workflows/codeql.yml` — Advanced security scanning
- **Trigger:** `pull_request` hacia `dev` o `qas` (se puede habilitar cron).
- **Cobertura:** ejecuta CodeQL para `javascript-typescript` en runners Ubuntu, generando reportes de vulnerabilidades y errores lógicos bajo `Security > Code scanning`.

---

## Secrets & Environments

Estos secretos deben existir en los ambientes de GitHub Actions usados por `deploy.yml` (al menos en `qas` y `prd`). Para pruebas locales o flujos alternos puedes definirlos también en `dev`.

| Secret             | Descripción                                                                 | Ambientes recomendados |
|--------------------|-----------------------------------------------------------------------------|------------------------|
| `VERCEL_TOKEN`     | Token personal o de servicio con permisos para desplegar proyectos en Vercel.| `qas`, `prd` (opcional `dev`) |
| `VERCEL_ORG_ID`    | Identificador de la organización/equipo en Vercel donde vive el proyecto.    | `qas`, `prd` (opcional `dev`) |
| `VERCEL_PROJECT_ID`| Identificador del proyecto en Vercel que recibirá los despliegues.          | `qas`, `prd` (opcional `dev`) |

> Configura cada secreto en la sección **Settings → Secrets and variables → Actions → Environments** y asigna los ambientes `qas` y `prd` para que el job `deploy` pueda leerlos automáticamente.

---

## Getting Started

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/E10YDEV/OpenLinks.git
   cd OpenLinks
   ```
2. **Instala dependencias**
   ```sh
   npm install
   ```
3. **Personaliza tu página**
   - Edita [`OpenLinks.json`](OpenLinks.json) para perfil, links y tema.
   - (Opcional) modifica [`themes.ts`](themes.ts) para nuevos estilos.
4. **Servidor de desarrollo**
   ```sh
   npm run dev
   ```
   Visita [http://localhost:4321/links/](http://localhost:4321/links/).
5. **Build de producción**
   ```sh
   npm run build
   ```
6. **Preview del build**
   ```sh
   npm run preview
   ```

---

## Configuration

- **Fuente única de verdad:** `OpenLinks.json` define SEO, perfil, links, tema y pie de página. Cualquier cambio se refleja inmediatamente en desarrollo.
- **Ruta pública:** Astro genera páginas y recursos bajo `/links`; la URL canónica es `https://gerardoguzmanh.com/links/`.
- **Enrutamiento de Vercel:** `vercel.json` traduce `/links` y `/links/*` a la raíz del artefacto estático que genera Astro.
- **Temas:** ajusta la propiedad `"theme"` con las claves disponibles en [`themes.ts`](themes.ts) (`default`, `ocean`, `forest`, `sunrise`, `ness`, `arctic`, `cherry`, `brutalism`, etc.) o crea nuevas entradas.
- **Íconos e imágenes:** guarda SVGs y assets en `public/` (por ejemplo `public/icons/MyIcon.svg`) y referencia rutas relativas al base, como `icons/MyIcon.svg`.
- **Leyendas hover:** cada link puede añadir `legend` (o `description`) para mostrar un tooltip animado en la UI.

## Deployment en Vercel

El proyecto se despliega de forma independiente y utiliza dos direcciones:

- `https://links.gerardoguzmanh.com/links/` como origen estable asignado a este proyecto en Vercel.
- `https://gerardoguzmanh.com/links/` como URL pública, servida mediante las rewrites de `consulting_services`.

Para publicar:

1. Ejecuta `npm ci`, `npm run lint`, `npm run check`, `npm run test` y `npm run build`.
2. Despliega la rama y comprueba `/links/` en la URL Preview de Vercel.
3. Asigna únicamente `links.gerardoguzmanh.com` a este proyecto; el dominio raíz pertenece a `consulting_services`.
4. Confirma que `https://links.gerardoguzmanh.com/links/` carga la página y sus recursos.
5. Despliega las rewrites de `consulting_services` y valida `https://gerardoguzmanh.com/links/`.

---

## Example `OpenLinks.json`

```json
{
  "title": "Your Links",
  "description": "Free JSON-driven template for Astro.",
  "url_base": "https://example.com",
  "theme": "ocean",
  "footer": "Made with ❤️ by You",
  "profile": {
    "name": "Your Name",
    "avatar": "avatar/me.webp",
    "description": "@yourhandle",
    "instagram": "https://instagram.com/yourhandle",
    "adult": false
  },
  "links": [
    {
      "name": "Portfolio",
      "url": "https://example.com/portfolio",
      "icon": "icons/web.svg",
      "legend": "Explora mis últimos proyectos."
    },
    {
      "name": "Newsletter",
      "url": "https://example.com/newsletter",
      "icon": "icons/email.svg",
      "legend": "Suscríbete para recibir novedades."
    }
  ]
}
```

---

## Fields

- `title`: título mostrado en SEO y en la cabecera del navegador.
- `description`: metadescripción y resumen principal.
- `url_base`: URL canónica usada en metadatos y Open Graph.
- `theme`: clave del objeto dentro de [`themes.ts`](themes.ts) para decidir fondos, botones e interacciones.
- `footer`: HTML permitido para mostrar créditos o enlaces externos.
- `profile`
  - `name`: texto grande junto al avatar.
  - `avatar`: ruta en `public/` (JPEG, PNG o WebP).
  - `description`: alias corto o bio.
  - `instagram`: URL opcional; si existe, el avatar se convierte en enlace directo a Instagram.
  - `adult`: `true` muestra un banner +18 antes de los links.
- `links[]`
  - `name`: etiqueta visible en cada botón.
  - `url`: destino del enlace (se abre en la misma pestaña; puedes modificarlo si lo prefieres).
  - `icon`: ruta a un SVG cuadrado; se usa fallback `/Web.svg` si no existe.
  - `legend`: texto mostrado en el tooltip hover (también se usa `description` o `name` como respaldo).

---

## Customizing

- **Temas personalizados:** duplica un entry en `themes.ts` y ajusta clases de Tailwind (`background`, `links_button`, `links_text`, etc.) para nuevos estilos.
- **Componentes Astro:** `src/components/` contiene piezas como `link.astro`, `header.astro` o `footer.astro`; puedes ampliar props o estilos sin romper el flujo DevOps.
- **Íconos y tipografías:** coloca assets en `public/` y referencia desde el JSON o desde CSS global (`src/styles/global.css`).
- **Pipelines:** ajusta los YAML si necesitas otros ambientes (por ejemplo, agregando pruebas unitarias o gates en `validate.yml`). El diseño modular permite experimentar con estrategias DevOps avanzadas.

---

## Scripts

| Command         | Acción                                                |
|-----------------|--------------------------------------------------------|
| `npm run dev`   | Inicia el servidor de desarrollo                       |
| `npm run build` | Genera el sitio para producción en `/dist`             |
| `npm run preview` | Sirve el build de producción localmente             |
| `npm run lint`  | Ejecuta ESLint con la config del proyecto              |
| `npm run check` | Corre `astro check` + validaciones de TypeScript       |

---

Mantén tus cambios en `OpenLinks.json`, deja que los pipelines hagan el resto y practica un flujo Dev → QA → Prod completo con Astro. ¡Feliz automatización! 💻✨
