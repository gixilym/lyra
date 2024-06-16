import { BaseDirectory } from "@tauri-apps/api/fs";

const BASE_DIRECTORY: { dir: BaseDirectory } = { dir: BaseDirectory.Document };

const MAIN_FOLDER: string = "lyra";

const BACKUP_FOLDER: string = "lyra-backup";

const PAGES: Pages = {
  presentation: "/",
  list: "/list",
  backup: "/backup",
  support: "/support",
  preferences: "/preferences",
  file: "/file",
  updates: "/updates",
};

const THEMES: Themes = {
  clearNigth: "clear-nigth",
  darkNigth: "dark-nigth",
  sunnyDay: "sunny-day",
};

const LANGS: Langs = {
  es: "ES",
  en: "EN",
};

const FONTS: Fonts = [
  { value: "font-duo", label: "Monospace" },
  { value: "font-sara", label: "Sarabun" },
];

const INTRODUCTION: string = `lyra es tu espacio para dejar volar tu creatividad sin distracciones.\n\nDiseñada para aquellos que aman escribir de manera enfocada, ya sea un libro, pensamientos, un diario personal, o cualquier tipo de contenido.\n\nFunciona sin conexión, asegurando que tus escritos se mantengan seguros, privados y accesibles en tu dispositivo. No se recopilan datos de usuario.\n\nOfrece temas para adaptarse a tu estilo, comandos de teclado para una experiencia de escritura fluida. Disponible en español e inglés (más próximamente)\n\n¡Empieza a escribir en lyra y transforma tus ideas en palabras!`;

export {
  BACKUP_FOLDER,
  BASE_DIRECTORY,
  FONTS,
  INTRODUCTION,
  LANGS,
  MAIN_FOLDER,
  PAGES,
  THEMES,
};

interface Pages {
  presentation: string;
  list: string;
  backup: string;
  support: string;
  preferences: string;
  file: string;
  updates: string;
}

interface Themes {
  clearNigth: string;
  darkNigth: string;
  sunnyDay: string;
}

interface Langs {
  es: string;
  en: string;
}

type Fonts = { value: string; label: string }[];
