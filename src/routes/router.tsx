import { createBrowserRouter, Outlet, redirect } from "react-router-dom"
import { Nav } from "../Nav"
import { guardedRoutes } from "./guardedRoutes"
import { paths } from "./paths"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Outlet />
      </>
    ),
    children: [
      ...guardedRoutes,
    ],
  },
  {
    path: "*",
    loader: () => redirect(paths.signin),
  },
])
