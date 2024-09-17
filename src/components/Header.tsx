import { ArrowLeft, EyeOff as HiddenIcon, Eye as ShowIcon } from "lucide-react";
import { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { PAGES, THEMES } from "../utils/consts";
import translations from "../utils/dictionary";
import { navigation, pathIs, themes } from "../utils/helpers";
import type { Component } from "../utils/types";
import { Link } from "react-router-dom";

function Header(): Component {
  const d = translations(),
    { isSunnyDay } = themes(),
    { showHeader, setShowHeader } = configStore(),
    { setItem } = useStorage(),
    { goTo } = navigation(),
    [menu, setMenu] = useState<Menu>(initMenu),
    menuStyles: string = isSunnyDay
      ? "bg-gray-300 border-t-gray-300/90 border-[#979797]"
      : "bg-[#151515] border-t-gray-900/90 border-[#383838]";

  function closeMenu(id: string): void {
    document.getElementById(id)?.removeAttribute("open");
  }

  function closeAllMenus(): void {
    closeMenu("file");
    closeMenu("commands");
    closeMenu("help");
    closeMenu("themes");
    setMenu({ file: false, commands: false, help: false, themes: false });
  }

  function changeTheme(theme: string): void {
    setItem("theme", theme);
    location.reload();
  }

  function toggleMenu(menuId: string): void {
    closeAllMenus();
    setMenu(prevState => ({ ...prevState, [menuId]: true }));
  }

  return showHeader ? (
    <>
      <p className="text-transparent">.</p>
      <header
        onMouseLeave={closeAllMenus}
        className={twMerge(
          isSunnyDay
            ? "bg-gray-300 text-black/80 border-[#979797] [&>div>details>summary:hover]:text-black"
            : "bg-[#151515] text-white/70 border-[#252525] [&>div>details>summary:hover]:text-white",
          "select-none text-sm cursor-default border-b w-full justify-between items-center flex px-4 h-8 fixed top-0 left-0 z-50"
        )}
      >
        <div className="flex gap-x-4 justify-start items-center">
          <details id="file" className="relative">
            <summary onClick={() => toggleMenu("file")}>{d.File}</summary>

            {menu.file && (
              <div
                className={twJoin(
                  menuStyles,
                  "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-48 py-2 gap-y-2 z-10"
                )}
              >
                <p
                  onClick={() => goTo(PAGES.list)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.List}
                </p>
                <p
                  onClick={() => goTo(PAGES.preferences)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.Preferences}
                </p>
              </div>
            )}
          </details>

          <details id="commands" className="relative">
            <summary onClick={() => toggleMenu("commands")}>
              {d.Commands}
            </summary>

            {menu.commands && (
              <div
                className={twJoin(
                  menuStyles,
                  "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-[360px] py-2 gap-y-2 z-10"
                )}
              >
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.FullScreen}</p>
                  <kbd> F11</kbd>
                </div>
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.Search}</p>
                  <kbd> CTRL + F</kbd>
                </div>
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.CheckSpelling}</p>
                  <kbd> CTRL + M</kbd>
                </div>
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.ReduceTextSize}</p>
                  <kbd> CTRL + B</kbd>
                </div>
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.IncreaseTextSize}</p>
                  <kbd> CTRL + N</kbd>
                </div>
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.AlternateText}</p>
                  <kbd> CTRL + H</kbd>
                </div>
                <div className="cursor-default w-full flex justify-between items-center gap-x-4">
                  <p>{d.CopyText}</p>
                  <kbd> CTRL + A</kbd>
                </div>
              </div>
            )}
          </details>

          <details id="themes" className="relative">
            <summary onClick={() => toggleMenu("themes")}>{d.Themes}</summary>

            {menu.themes && (
              <div
                className={twJoin(
                  menuStyles,
                  "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2 z-10"
                )}
              >
                <p
                  onClick={() => changeTheme(THEMES.clearNigth)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.ClearNight}
                </p>
                <p
                  onClick={() => changeTheme(THEMES.darkNigth)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.DarkNight}
                </p>
                <p
                  onClick={() => changeTheme(THEMES.sunnyDay)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.SunnyDay}
                </p>
              </div>
            )}
          </details>

          <details id="help" className="relative">
            <summary onClick={() => toggleMenu("help")}>{d.Help}</summary>

            {menu.help && (
              <div
                className={twJoin(
                  menuStyles,
                  "absolute top-6 left-0 border px-4 flex flex-col justify-center items-start w-44 py-2 gap-y-2 z-10"
                )}
              >
                <p
                  onClick={() => goTo(PAGES.presentation)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.About}
                </p>
                <p
                  onClick={() => goTo(PAGES.support)}
                  className={twMerge(
                    isSunnyDay ? "hover:text-gray-500" : "hover:text-white",
                    "cursor-default w-full"
                  )}
                >
                  {d.Support}
                </p>
              </div>
            )}
          </details>
        </div>

        <div className="flex gap-x-4 justify-center items-center">
          {pathIs(PAGES.file) && (
            <Link to={PAGES.list}>
              <ArrowLeft size={18} />
            </Link>
          )}
          <ShowIcon
            size={20}
            onClick={() => setShowHeader()}
            color={isSunnyDay ? "#1f1f1f9d" : "#ffffff9d"}
            className="cursor-pointer"
          />
        </div>
      </header>
    </>
  ) : (
    <>
      <p className="text-transparent">.</p>
      <header className="fixed top-0 right-0 bg-transparent w-full justify-end items-center flex px-4 h-8 border-b border-transparent">
        <HiddenIcon
          color={isSunnyDay ? "#1f1f1f9d" : "#ffffff29"}
          size={20}
          onClick={() => setShowHeader()}
          className="cursor-pointer"
        />
      </header>
    </>
  );
}

export default Header;

const initMenu: Menu = {
  file: false,
  commands: false,
  help: false,
  themes: false,
};

interface Menu {
  file: boolean;
  commands: boolean;
  help: boolean;
  themes: boolean;
}
