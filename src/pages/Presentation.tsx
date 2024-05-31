import { motion } from "framer-motion";
import { Feather as FeatherIcon } from "lucide-react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import MainContainer from "../components/MainContainer";
import TypingAnimation from "../components/TypingAnimation";
import translations from "../utils/dictionary";
import { PAGES } from "../utils/consts";
import { navigation, themes, verifyMainFolder } from "../utils/helpers";
import type { Component } from "../utils/types";

function Presentation(): Component {
  const { goTo } = navigation();
  const { isSunnyDay } = themes();
  const d = translations();

  useEffect(() => {
    verifyMainFolder();
  }, []);


  return (
    <MainContainer>
      <section className="px-6 sm:px-0 w-full max-w-[700px] h-full min-h-[300px] flex flex-col justify-between items-center sm:mt-10 mt-0">
        <div className="w-full flex justify-start items-end">
          <h1
            className={twMerge(
              isSunnyDay ? "text-black/90" : "text-gray-200 ",
              "sm:text-7xl text-5xl tracking-tight"
            )}
          >
            <span className="text-indigo-500">l</span>y
            <span className="text-indigo-500">r</span>a
            <span className="sm:text-4xl text-2xl">:</span>
          </h1>

          <TypingAnimation
            text={d.FocusedWriting}
            className={twMerge(
              isSunnyDay ? "text-black/90" : "text-gray-200",
              "sm:text-3xl text-2xl"
            )}
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
            "sm:text-lg text-md w-full flex justify-start items-center sm:gap-x-3 gap-x-1 [&>span]:text-indigo-500 [&>span]:font-semibold [&>span]:text-2xl"
          )}
        >
          <li>{d.MinimalDesing}</li>
          <span>-</span>
          <li>{d.OfflineAccess}</li>
          <span>-</span>
          <li>{d.LocalSaved}</li>
        </ol>

        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => goTo(PAGES.list)}
            className="text-xl text-white hover:bg-indigo-500 duration-75 pb-2 pt-1.5 px-6 rounded-lg bg-indigo-600"
          >
            {d.Start}
          </button>
        </div>

        <div
          className={twMerge(
            isSunnyDay ? "text-black/90" : "text-gray-400",
            "flex justify-start gap-x-10 items-center w-full sm:text-lg text-md"
          )}
        >
          <p>{d.Version}: 1.0.0</p>
          <a
            href="https://github.com/gixilym"
            target="_blank"
            className="cursor-default hover:underline"
          >
            {d.DevelopedBy}
          </a>
        </div>
      </section>




    </MainContainer>
  );
}

export default Presentation;
