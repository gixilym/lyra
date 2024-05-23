import type { Component } from "../utils/types";
import { Feather as FeatherIcon } from "lucide-react";
import MainContainer from "../components/MainContainer";
import { navigation } from "../utils/helpers";
import { PAGES } from "../utils/consts";

function Presentation(): Component {
  const { goTo } = navigation();

  return (
    <MainContainer>
      <section className="w-full max-w-[600px] h-full min-h-[270px] flex flex-col justify-between items-center mt-10">
        <div className="w-full flex justify-start items-end">
          <h1 className="text-7xl text-gray-200">
            <span className="text-indigo-500">l</span>y
            <span className="text-indigo-500">r</span>a
          </h1>
          <p className="text-2xl text-gray-200/90 pr-10">
            :&nbsp;escritura enfocada
          </p>
          <FeatherIcon size={70} color="rgb(99,102,241)" />
        </div>

        <ol className="text-xl w-full flex justify-start items-center text-gray-300 gap-x-4 [&>span]:text-indigo-500 [&>span]:font-semibold [&>span]:text-2xl">
          <li>diseño minimalista</li>
          <span>-</span>
          <li>acceso sin conexión</li>
          <span>-</span>
          <li>guardado local</li>
        </ol>

        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => goTo(PAGES.list)}
            className="text-xl text-white hover:bg-indigo-500 duration-75 pb-2 pt-1.5 px-6 rounded-lg bg-indigo-600"
          >
            comenzar
          </button>
        </div>

        <div className="flex justify-start gap-x-4 items-center w-full text-gray-400 text-lg">
          <p>versión: 1.0.0</p>
          <a
            href="https://github.com/gixilym"
            target="_blank"
            className="hover:text-gray-300/90 duration-75 cursor-default hover:underline"
          >
            desarrollado por gixi
          </a>
        </div>
      </section>
    </MainContainer>
  );
}

export default Presentation;
