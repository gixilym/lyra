import { BaseDirectory } from "@tauri-apps/api/fs";

const BASE_DIRECTORY: { dir: BaseDirectory } = { dir: BaseDirectory.Document };

const MAIN_FOLDER: string = "lyra";

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

const TEXT_SIZES: TextSizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-2xl",
  xxxl: "text-3xl",
};

const TEXT_ALIGNS: AlignsText = {
  start: "text-start",
  center: "text-center",
  end: "text-right",
};

const WELCOME_ES: string = "Bienvenido a lyra.txt";

const WELCOME_EN: string = "Welcome to lyra.txt";

const INTRO_ES: string = `lyra es tu espacio para dejar volar tu creatividad sin distracciones.\n\nDiseñada para aquellos que aman escribir de manera enfocada, ya sea un libro, pensamientos, un diario personal, o cualquier tipo de contenido.\n\nFunciona sin conexión, asegurando que tus escritos se mantengan seguros, privados y accesibles en tu dispositivo. No se recopilan datos de usuario.\n\nOfrece temas para adaptarse a tu estilo, comandos de teclado para una experiencia de escritura fluida. Disponible en español e inglés (más próximamente)\n\n¡Empieza a escribir en lyra y transforma tus ideas en palabras!`;

const INTRO_EN: string = `lyra is your space to let your creativity soar without distractions.\n\nDesigned for those who love focused writing, whether it's a book, thoughts, a personal journal, or any type of content.\n\nIt works offline, ensuring that your writings remain safe, private, and accessible on your device. No user data is collected.\n\nIt offers themes to match your style, keyboard commands for a smooth writing experience. Available in Spanish and English (more coming soon).\n\nStart writing in Lyra and transform your ideas into words!`;

export {
  TEXT_ALIGNS,
  BASE_DIRECTORY,
  WELCOME_ES,
  WELCOME_EN,
  INTRO_ES,
  INTRO_EN,
  LANGS,
  MAIN_FOLDER,
  PAGES,
  THEMES,
  TEXT_SIZES,
};

interface TextSizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

interface AlignsText {
  start: string;
  center: string;
  end: string;
}

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
