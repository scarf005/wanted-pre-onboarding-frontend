import { createBrowserRouter, Outlet, redirect } from "react-router-dom"
import { Nav } from "../Nav"
import { guardedRoutes } from "./guardedRoutes"
import { paths } from "./paths"
import { localStorageKey } from "../utils/ids"

export const isAuthenticated = () =>
  localStorage.getItem(localStorageKey.jwtToken) !== null

export const logout = async () => {
  localStorage.removeItem(localStorageKey.jwtToken)
  return redirect(paths.signin)
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Outlet />
      </>
    ),
    children: guardedRoutes,
    loader: isAuthenticated,
    action: logout,
  },
  {
    path: "*",
    loader: () => redirect(paths.signin),
  },
])
