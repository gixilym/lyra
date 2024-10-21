import usePreferences from "../hooks/usePreferences";
import useStorage from "../hooks/useStorage";
import { configStore } from "../store/configStore";
import { fileStore } from "../store/fileStore";
import translations from "../utils/dictionary";
import type { Component } from "../utils/types";

function ModifiedFile(): Component {
  const d = translations(),
    { getItem } = useStorage(),
    { selectedFile } = fileStore(),
    { myLastModified } = usePreferences(),
    { showHeader } = configStore(),
    lastModified: string = getItem(`${selectedFile.name}-modified`, "");

  return (
    <div className="hidden lg:flex items-center h-[37px] opacity-65 justify-start z-50 sm:text-sm text-xs lowercase  fixed right-36 w-[280px] pointer-events-none">
      {myLastModified() && lastModified && showHeader && (
        <p className="w-full">
          {d.Modified}: {lastModified}
        </p>
      )}
    </div>
  );
}

export default ModifiedFile;
