import type { Component } from "../utils/types";
import { useState } from "react";
import { EyeOff as HiddenIcon, Eye as ShowIcon } from "lucide-react";
import { PAGES } from "../utils/consts";

function Header(): Component {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [menu, setMenu] = useState<Menu>(initMenu);

  function closeMenu(id: string): void {
    document.getElementById(id)?.removeAttribute("open");
  }

  function onMouseLeave(): void {
    closeMenu("archivo");
    closeMenu("comandos");
    closeMenu("ayuda");
    setMenu({ archivo: false, comandos: false, ayuda: false });
  }

  return showHeader ? (
    <header
      onMouseLeave={onMouseLeave}
      className="select-none [&>div>details>summary:hover]:text-white text-sm cursor-default border-b border-[#252525] w-full justify-between items-center flex text-white/70 px-4 py-1 bg-black/10"
    >
      <div className="flex gap-x-4 justify-start items-center">
        <details id="archivo" className="relative">
          <summary
            onClick={() => {
              closeMenu("comandos");
              closeMenu("ayuda");
              setMenu({ archivo: true, comandos: false, ayuda: false });
            }}
          >
            Archivo
          </summary>

          {menu.archivo && (
            <div className="absolute top-6 left-0 border border-t-gray-900/90 border-[#383838] px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2 bg-[#1d1d1d]">
              <a
                href={PAGES.list}
                className="cursor-default hover:text-white w-full"
              >
                Lista
              </a>
              <a
                href={PAGES.preferences}
                className="cursor-default hover:text-white w-full"
              >
                Preferencias
              </a>
              <a
                href={PAGES.backupcopy}
                className="cursor-default hover:text-white w-full"
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
              setMenu({ archivo: false, comandos: true, ayuda: false });
            }}
          >
            Comandos
          </summary>

          {menu.comandos && (
            <div className="absolute top-6 left-0 border border-t-gray-900/90 border-[#383838] px-4 flex flex-col justify-center items-start w-72 py-2 gap-y-2 bg-[#1d1d1d]">
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

        <details id="ayuda" className="relative">
          <summary
            onClick={() => {
              closeMenu("archivo");
              closeMenu("comandos");
              setMenu({ archivo: false, comandos: false, ayuda: true });
            }}
          >
            Ayuda
          </summary>

          {menu.ayuda && (
            <div className="absolute top-6 left-0 border border-t-gray-900/90 border-[#383838] px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2 bg-[#1d1d1d]">
              <a
                href={PAGES.presentation}
                className="hover:text-white cursor-default"
              >
                Acerca de
              </a>
              <a
                href={PAGES.contact}
                className="cursor-default hover:text-white w-full"
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
        color="#ffffff9d"
        className="cursor-pointer"
      />
    </header>
  ) : (
    <header className="bg-transparent w-full justify-end items-center flex px-4 py-1 border-b border-transparent">
      <HiddenIcon
        color="#ffffff4c"
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
};

interface Menu {
  archivo: boolean;
  comandos: boolean;
  ayuda: boolean;
}
