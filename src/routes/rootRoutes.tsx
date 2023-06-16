import { Outlet, redirect, RouteObject } from "react-router-dom"
import { Nav } from "../Nav"
import { guardedRoutes } from "./guardedRoutes"
import { paths } from "./paths"
import { localStorageKey } from "../utils/ids"

export const isAuthenticated = () =>
  localStorage.getItem(localStorageKey.jwtToken) !== null
const toSignIn = () => redirect(paths.signin)

export const logout = async () => {
  localStorage.removeItem(localStorageKey.jwtToken)
  return toSignIn()
}

export const rootRoutes: RouteObject[] = [
  {
    path: "/",
    id: "인덱스 라우트",
    element: (
      <>
        <Nav />
        <Outlet />
      </>
    ),
    children: [
      ...guardedRoutes,
      {
        path: "/",
        id: "정확히 인덱스 라우트 (/)",
        loader: toSignIn,
        action: logout,
      },
    ],
    loader: isAuthenticated,
    action: logout,
  },
  {
    path: "*",
    loader: toSignIn,
  },
]
