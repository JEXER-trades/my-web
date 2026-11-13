import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";

// Interior pages are code-split; the homepage ships in the main bundle.
const Services = lazy(() => import("@/pages/Services"));
const Work = lazy(() => import("@/pages/Work"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const s = (el: React.ReactNode) => <Suspense fallback={<div className="min-h-[100svh] bg-paper" />}>{el}</Suspense>;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: s(<Services />) },
      { path: "/work", element: s(<Work />) },
      { path: "/work/:slug", element: s(<ProjectDetail />) },
      { path: "/about", element: s(<About />) },
      { path: "/contact", element: s(<Contact />) },
      { path: "/privacy", element: s(<Privacy />) },
      { path: "/legal", element: s(<Legal />) },
      { path: "*", element: s(<NotFound />) },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default function App() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
