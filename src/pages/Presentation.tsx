import type { Component } from "../utils/types";
import { Feather as FeatherIcon } from "lucide-react";
import MainContainer from "../components/MainContainer";
import { navigation, themes } from "../utils/helpers";
import { PAGES } from "../utils/consts";
import TypingAnimation from "../components/TypingAnimation";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

function Presentation(): Component {
  const { goTo } = navigation();
  const { isSunnyDay } = themes();

  return (
    <MainContainer>
      <section className="font-duo w-full max-w-[700px] h-full min-h-[300px] flex flex-col justify-between items-center mt-10">
        <div className="w-full flex justify-start items-end">
          <h1
            className={twMerge(
              isSunnyDay ? "text-black/90" : "text-gray-200 ",
              "text-7xl tracking-tight"
            )}
          >
            <span className="text-indigo-500">l</span>y
            <span className="text-indigo-500">r</span>a
            <span className="text-4xl">:</span>
          </h1>

          <TypingAnimation
            text="&nbsp;escritura&nbsp;enfocada&nbsp;"
            className={
              isSunnyDay ? "text-black/90 text-3xl" : "text-gray-200 text-3xl"
            }
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatherIcon size={70} color="rgb(99,102,241)" />
          </motion.div>
        </div>

        <ol
          className={twMerge(
            isSunnyDay ? "text-black/90" : "text-gray-200",
            "text-lg w-full flex justify-start items-center gap-x-3 [&>span]:text-indigo-500 [&>span]:font-semibold [&>span]:text-2xl"
          )}
        >
          <li>diseño minimalista</li>
          <span>-</span>
          <li>acceso sin conexión</li>
          <span>-</span>
          <li>guardado local</li>
        </ol>

        <button
          onClick={() => {
            localStorage.clear();
          }}
        >
          vaciar
        </button>

        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => goTo(PAGES.list)}
            className="text-xl text-white hover:bg-indigo-500 duration-75 pb-2 pt-1.5 px-6 rounded-lg bg-indigo-600"
          >
            comenzar
          </button>
        </div>

        <div
          className={twMerge(
            isSunnyDay ? "text-black/90" : "text-gray-400",
            "flex justify-start gap-x-10 items-center w-full text-lg"
          )}
        >
          <p>versión: 1.0.0</p>
          <a
            href="https://github.com/gixilym"
            target="_blank"
            className="cursor-default hover:underline"
          >
            desarrollado por gixi
          </a>
        </div>
      </section>
    </MainContainer>
  );
}

export default Presentation;
