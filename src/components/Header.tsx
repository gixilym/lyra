import type { Component } from "../utils/types";
import { useState } from "react";
import { EyeOff as HiddenIcon, Eye as ShowIcon } from "lucide-react";
import { PAGES, THEMES } from "../utils/consts";
import useStorage from "../hooks/useStorage";
import { twJoin, twMerge } from "tailwind-merge";
import { themes } from "../utils/helpers";

function Header(): Component {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [menu, setMenu] = useState<Menu>(initMenu);
  const { setItem } = useStorage();
  const { isSunnyDay } = themes();
  const menuStyles: string = isSunnyDay
    ? "bg-gray-300 border-t-gray-300/90 border-[#979797]"
    : "bg-[#1d1d1d] border-t-gray-900/90 border-[#383838]";

  function closeMenu(id: string): void {
    document.getElementById(id)?.removeAttribute("open");
  }

  function closeAllMenus(): void {
    closeMenu("archivo");
    closeMenu("comandos");
    closeMenu("ayuda");
    closeMenu("temas");
    setMenu({ archivo: false, comandos: false, ayuda: false, temas: false });
  }

  function changeTheme(theme: string): void {
    setItem("theme", theme);
    location.reload();
  }

  return showHeader ? (
    <header
      onMouseLeave={closeAllMenus}
      className={twMerge(
        isSunnyDay
          ? "bg-gray-300 text-black/80 border-[#979797] [&>div>details>summary:hover]:text-black"
          : "bg-black/10 text-white/70 border-[#252525] [&>div>details>summary:hover]:text-white",
        "select-none text-sm cursor-default border-b w-full justify-between items-center flex px-4 py-1"
      )}
    >
      <div className="flex gap-x-4 justify-start items-center">
        <details id="archivo" className="relative">
          <summary
            onClick={() => {
              closeMenu("comandos");
              closeMenu("ayuda");
              closeMenu("temas");
              setMenu({
                archivo: true,
                comandos: false,
                ayuda: false,
                temas: false,
              });
            }}
          >
            Archivo
          </summary>

          {menu.archivo && (
            <div
              className={twJoin(
                menuStyles,
                "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2"
              )}
            >
              <a
                href={PAGES.list}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Lista
              </a>
              <a
                href={PAGES.preferences}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Preferencias
              </a>
              <a
                href={PAGES.backupcopy}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Copia de seguridad
              </a>
            </div>
          )}
        </details>

        <details id="comandos" className="relative">
          <summary
            onClick={() => {
              closeMenu("archivo");
              closeMenu("ayuda");
              closeMenu("temas");
              setMenu({
                archivo: false,
                comandos: true,
                ayuda: false,
                temas: false,
              });
            }}
          >
            Comandos
          </summary>

          {menu.comandos && (
            <div
              className={twJoin(
                menuStyles,
                "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-72 py-2 gap-y-2"
              )}
            >
              <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                <p>Buscar</p>
                <kbd> CTRL + F</kbd>
              </div>
              <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                <p>Revisar ortografía</p>
                <kbd> CTRL + M</kbd>
              </div>
              <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                <p>Reducir tamaño de texto</p>
                <kbd> CTRL + B</kbd>
              </div>
              <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                <p>Aumentar tamaño de texto</p>
                <kbd> CTRL + N</kbd>
              </div>
              <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                <p>Centrar texto</p>
                <kbd> CTRL + H</kbd>
              </div>
            </div>
          )}
        </details>

        <details id="temas" className="relative">
          <summary
            onClick={() => {
              closeMenu("archivo");
              closeMenu("comandos");
              closeMenu("ayuda");
              setMenu({
                archivo: false,
                comandos: false,
                ayuda: false,
                temas: true,
              });
            }}
          >
            Temas
          </summary>

          {menu.temas && (
            <div
              className={twJoin(
                menuStyles,
                "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2"
              )}
            >
              <p
                onClick={() => changeTheme(THEMES.clearNigth)}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Noche clara
              </p>
              <p
                onClick={() => changeTheme(THEMES.darkNigth)}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Noche oscura
              </p>
              <p
                onClick={() => changeTheme(THEMES.sunnyDay)}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Día soleado
              </p>
            </div>
          )}
        </details>

        <details id="ayuda" className="relative">
          <summary
            onClick={() => {
              closeMenu("archivo");
              closeMenu("comandos");
              closeMenu("temas");
              setMenu({
                archivo: false,
                comandos: false,
                ayuda: true,
                temas: false,
              });
            }}
          >
            Ayuda
          </summary>

          {menu.ayuda && (
            <div
              className={twJoin(
                menuStyles,
                "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2"
              )}
            >
              <a
                href={PAGES.presentation}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Acerca de
              </a>
              <a
                href={PAGES.contact}
                className={twMerge(
                  isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                  "cursor-default w-full"
                )}
              >
                Contacto
              </a>
            </div>
          )}
        </details>
      </div>
      <ShowIcon
        size={20}
        onClick={() => setShowHeader(false)}
        color={isSunnyDay ? "#1f1f1f9d" : "#ffffff9d"}
        className="cursor-pointer"
      />
    </header>
  ) : (
    <header className="bg-transparent w-full justify-end items-center flex px-4 py-1 border-b border-transparent">
      <HiddenIcon
        color={isSunnyDay ? "#1f1f1f9d" : "#ffffff9d"}
        size={20}
        onClick={() => setShowHeader(true)}
        className="cursor-pointer"
      />
    </header>
  );
}

export default Header;

const initMenu: Menu = {
  archivo: false,
  comandos: false,
  ayuda: false,
  temas: false,
};

interface Menu {
  archivo: boolean;
  comandos: boolean;
  ayuda: boolean;
  temas: boolean;
}
