import { createBrowserRouter, Outlet, redirect } from "react-router-dom"
import { Nav } from "../Nav"
import { guardedRoutes } from "./guardedRoutes"
import { AuthProvider } from "../authprovider"
import { paths } from "./paths"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Nav />
        <Outlet />
      </AuthProvider>
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
