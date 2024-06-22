import { lazy, StrictMode, Suspense } from "react";
import { type Container, createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PresentationPage from "./pages/Presentation";
import "./styles.css";
import type { LazyCmp } from "./utils/types";
import { myFontVal } from "./utils/helpers";

const ROOT: Container =
  document.getElementById("root") ?? document.createElement("root");

const ListPage: LazyCmp = lazy(() => import("./pages/List"));
const FilePage: LazyCmp = lazy(() => import("./pages/FileContent"));
const PreferencesPage: LazyCmp = lazy(() => import("./pages/Preferences"));
const SupportPage: LazyCmp = lazy(() => import("./pages/Support"));

const font = myFontVal();

const router = createBrowserRouter([
  {
    path: "/",
    element: <PresentationPage />,
  },
  {
    path: "/list",
    element: <ListPage />,
  },
  {
    path: "/file",
    element: <FilePage />,
  },
  {
    path: "/preferences",
    element: <PreferencesPage />,
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
]);

createRoot(ROOT).render(
  <StrictMode>
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
    <Toaster
      position="top-right"
      reverseOrder={false}
      containerClassName={font}
    />
  </StrictMode>
);
