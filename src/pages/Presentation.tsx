import type { Component } from "../utils/types";
import { Feather as FeatherIcon } from "lucide-react";
import { motion } from "framer-motion";
import MainContainer from "../components/MainContainer";

function Presentation(): Component {
  return (
    <MainContainer>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-sarabun w-full h-full flex flex-col justify-center items-center gap-y-8 relative"
      >
        <div className="w-full flex flex-row justify-center gap-x-14 items-center">
          <h1 className="text-7xl text-gray-200">
            <span className="text-indigo-500">l</span>y
            <span className="text-indigo-500">r</span>a
          </h1>
          <FeatherIcon size={90} color="rgb(99,102,241)" />
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-y-4">
          <p className="w-full text-center text-2xl text-indigo-500">
            Características
          </p>
          <ol className="w-full flex flex-col justify-center items-center text-gray-300/90 gap-y-4 list-[circle] pl-4">
            <li className="text-lg">
              Organiza tus pensamientos y pon en órden tu mente.
            </li>
            <li className="text-lg">Diseño minimalista</li>
            <li className="text-lg ">
              Guardado seguro de lo que escribas localmente.
            </li>
          </ol>
        </div>
        <div className="flex flex-col justify-center gap-x-4 items-center w-full">
          <p className="text-lg text-gray-400">Versión: 1.0.0</p>
          <a
            href="https://github.com/gixilym"
            target="_blank"
            className="text-lg text-gray-400 hover:text-gray-300 duration-75 cursor-default hover:underline"
          >
            Desarrollado por Gixi
          </a>
        </div>
      </motion.section>
    </MainContainer>
  );
}

export default Presentation;
