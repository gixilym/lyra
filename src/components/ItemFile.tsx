import { readTextFile } from "@tauri-apps/api/fs";
import { confirm } from "@tauri-apps/api/dialog";
import { useStore } from "../utils/store";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import translations from "../translate/dictionary";
import type { Component, File } from "../utils/types";
import { ArrowUpLeft as RecoveryIcon } from "lucide-react";
import MenuFile from "./MenuFile";
import { lyraFolder, navigation } from "../utils/helpers";
import { DOCUMENT_DIRECTORY } from "../utils/consts";

function ItemFile(props: Props): Component {
  const { goTo } = navigation(),
    dictionary = translations(),
    { fileName, paperIsOpen } = props,
    { setSelectedFile, userConfig, setUserConfig, updateListFiles } =
      useStore();

  async function onClickItem() {
    const { folderPath } = await lyraFolder(`${fileName}.txt`);
    const fileContent = await readTextFile(folderPath, DOCUMENT_DIRECTORY);
    const newSelectedFile: File = { name: fileName, content: fileContent };
    setSelectedFile(newSelectedFile);
    goTo("/file");
  }

  async function recoveryPaperItem(event: any) {
    event.stopPropagation();

    const recovery = await confirm(
      `${dictionary.RestoreQuestion} ${fileName}?`,
      { title: "lyra", type: "warning" }
    );

    if (recovery) {
      setUserConfig({
        paper: userConfig.paper.filter((item: any) => item != fileName),
      });
      updateListFiles(fileName);
      toast(`${dictionary.RestoreSuccess} ${fileName}`, {
        icon: "❤️",
        duration: 2000,
        style: {
          backgroundColor: "#202020",
          color: "#69ff44",
        },
      });
    }
  }

  return (
    <motion.li
      onClick={onClickItem}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="w-full max-w-[450px] h-11 rounded text-gray-300 py-2 px-4 hover:cursor-pointer bg-gray-800/60 duration-75 flex justify-between items-center border-l-2 border-b-2 border-gray-600/30  hover:bg-gray-800"
    >
      <div className="flex justify-between items-center gap-x-4 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          {fileName}
        </motion.p>
      </div>

      {paperIsOpen ? (
        <RecoveryIcon onClick={recoveryPaperItem} />
      ) : (
        <MenuFile fileName={fileName} />
      )}
    </motion.li>
  );
}

interface Props {
  fileName: string;
  paperIsOpen?: boolean;
}

export default ItemFile;

/*
 useEffect(() => {
    async function updateUserConfig() {
      try {
        const desktop = await desktopDir(),
          path = await join(desktop, "lyra", "config.json");
        await writeTextFile(path, JSON.stringify(userConfig));
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
    updateUserConfig();
  }, [userConfig]);

 async function handleDelete(event: any) {
      event.stopPropagation();
      const confirmDelete = await confirm(
          `${dictionary.WantDelete} ${fileName}?`,
          {
            title: "lyra",
            type: "warning",
          }
        ),
        desktop = await desktopDir(),
        path = await join(desktop, "lyra"),
        filePath = await join(path, `${fileName}.txt`);

      if (confirmDelete) {
        setUserConfig({
          paper: userConfig.paper.filter((item: string) => item != fileName),
        });
        removeFile(fileName);
        toast(`Mataste a ${fileName}`, {
          icon: "⚰️",
          duration: 2000,
          style: {
            backgroundColor: "#202020",
            color: "red",
          },
        });
        await removeFile(filePath);
      } else return;
    }

  async function handleMoveToTrash(event: any) {
    event.stopPropagation();

    const accept = await confirm(`${dictionary.MoveToTrash} ${fileName}?`, {
        title: "lyra",
        type: "warning",
      }),
      deletedSnippet = {
        name: null,
        content: "",
        isCode: false,
      };

    if (accept) {
      toast(dictionary.SentToTrash, {
        icon: "🗑️",
        duration: 1500,
        style: {
          backgroundColor: "#202020",
          color: "#fff",
        },
      });

      removeFile(fileName);
      setSelectedFile(deletedSnippet);
      setUserConfig({ paper: [...userConfig.paper, fileName] });
    } else return;
  }*/
