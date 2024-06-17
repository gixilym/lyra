import { lazy, StrictMode, Suspense } from "react";
import { type Container, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PresentationPage from "./pages/Presentation";
import "./styles.css";
import type { LazyCmp } from "./utils/types";

const ROOT: Container =
  document.getElementById("root") ?? document.createElement("root");

const ListPage: LazyCmp = lazy(() => import("./pages/ListView"));
const FilePage: LazyCmp = lazy(() => import("./pages/FileContent"));
const PreferencesPage: LazyCmp = lazy(() => import("./pages/Preferences"));
const SupportPage: LazyCmp = lazy(() => import("./pages/Support"));
// const BackupPage: LazyCmp = lazy(() => import("./pages/Backup"));
// const UpdatesPage: LazyCmp = lazy(() => import("./pages/Updates"));

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
  /*
  {
    path: "/backup",
    element: <BackupPage />,
  },
  {
    path: "/updates",
    element: <UpdatesPage />,
  }, 
  */
]);

createRoot(ROOT).render(
  <StrictMode>
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
