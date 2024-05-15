import type { Component } from "../utils/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { EyeOff as HiddenIcon, Eye as ShowIcon } from "lucide-react";

function Header(): Component {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [menu, setMenu] = useState({
    archivo: false,
    edicion: false,
    ayuda: false,
  });

  function closeMenu(id: string): void {
    document.getElementById(id)?.removeAttribute("open");
  }

  function onMouseLeave(): void {
    closeMenu("archivo");
    closeMenu("edicion");
    closeMenu("ayuda");
    setMenu({ archivo: false, edicion: false, ayuda: false });
  }

  return showHeader ? (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onMouseLeave={onMouseLeave}
      className="[&>div>details>summary:hover]:text-white text-sm cursor-default absolute top-0 left-0 border-b border-[#383838] w-full justify-between items-center flex text-white/70 px-4 py-1 bg-black/10"
    >
      <div className="flex gap-x-4 justify-start items-center">
        <details id="archivo" className="relative">
          <summary
            onClick={() => {
              closeMenu("edicion");
              closeMenu("ayuda");
              setMenu({ archivo: true, edicion: false, ayuda: false });
            }}
          >
            Archivo
          </summary>

          {menu.archivo && (
            <div className="absolute top-6 left-0 border border-t-gray-900/90 border-[#383838] px-4 flex flex-col justify-center items-start w-44 py-1 gap-y-1">
              <a
                href="/list"
                className="cursor-default hover:text-white w-full"
              >
                Lista
              </a>
              <p className="cursor-default border-t border-[#383838] hover:text-white w-full">
                Preferencias
              </p>
              <p className="cursor-default hover:text-white border-t border-[#383838] w-full">
                Copia de seguridad
              </p>
            </div>
          )}
        </details>
        <details id="edicion" className="relative">
          <summary
            onClick={() => {
              closeMenu("archivo");
              closeMenu("ayuda");
              setMenu({ archivo: false, edicion: true, ayuda: false });
            }}
          >
            Edición
          </summary>

          {menu.edicion && (
            <div className="absolute top-6 left-0 border border-t-gray-900/90 border-[#383838] px-4 flex flex-col justify-center items-start w-44 py-1 gap-y-1">
              <p className="cursor-default hover:text-white w-full">Buscar</p>
              <p className="cursor-default hover:text-white w-full border-t border-[#383838]">
                Revisar ortografía
              </p>
            </div>
          )}
        </details>
        <details id="ayuda" className="relative">
          <summary
            onClick={() => {
              closeMenu("archivo");
              closeMenu("edicion");
              setMenu({
                archivo: false,
                edicion: false,
                ayuda: true,
              });
            }}
          >
            Ayuda
          </summary>

          {menu.ayuda && (
            <div className="absolute top-6 left-0 border border-t-gray-900/90 border-[#383838] px-4 flex flex-col justify-center items-start w-44 py-1 gap-y-1">
              <a href="/" className="hover:text-white cursor-default">
                Acerca de
              </a>
              <p className="cursor-default hover:text-white border-t border-[#383838] w-full">
                Contacto
              </p>
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
    </motion.header>
  ) : (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute top-0 left-0 bg-transparent w-full justify-end items-center flex px-4 py-1"
    >
      <HiddenIcon
        color="#ffffff4c"
        size={20}
        onClick={() => setShowHeader(true)}
        className="cursor-pointer"
      />
    </motion.header>
  );
}

export default Header;
