/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
