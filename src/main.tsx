import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BackupCopy from "./pages/BackupCopy";
import FileContent from "./pages/FileContent";
import ListView from "./pages/ListView";
import Preferences from "./pages/Preferences";
import Presentation from "./pages/Presentation";
import Support from "./pages/Support";
import Updates from "./pages/Updates";
import "./styles.css";

document.body.spellcheck = false;

const ROOT: Container =
  document.getElementById("root") ?? document.createElement("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Presentation />,
  },
  {
    path: "/list",
    element: <ListView />,
  },
  {
    path: "/file",
    element: <FileContent />,
  },
  {
    path: "/preferences",
    element: <Preferences />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/backupcopy",
    element: <BackupCopy />,
  },
  {
    path: "/updates",
    element: <Updates />,
  },
]);

createRoot(ROOT).render(
  <StrictMode>
    <RouterProvider router={router} />;
  </StrictMode>
);
