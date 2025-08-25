/// <reference types="vite/client" />

// (optionnel mais utile si tu veux typer précisément tes variables)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
