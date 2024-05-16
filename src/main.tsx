import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Presentation from "./pages/Presentation";
import ListView from "./pages/ListView";
import Settings from "./pages/Settings";
import FileContent from "./pages/FileContent";
import Header from "./components/Header";
import "@fontsource/sarabun";
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
    path: "/settings",
    element: <Settings />,
  },
]);

createRoot(ROOT).render(
  <StrictMode>
    <Header />
    <div className="mb-8" />
    <RouterProvider router={router} />;
  </StrictMode>
);
