import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Presentation from "./pages/Presentation";
import ListView from "./pages/ListView";
import Preferences from "./pages/Preferences";
import FileContent from "./pages/FileContent";
import Contact from "./pages/Contact";
import BackupCopy from "./pages/BackupCopy";
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
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/backupcopy",
    element: <BackupCopy />,
  },
]);

createRoot(ROOT).render(
  <StrictMode>
    <RouterProvider router={router} />;
  </StrictMode>
);
