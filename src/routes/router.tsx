import { createBrowserRouter, Outlet } from "react-router-dom"
import { Nav } from "../Nav"
import { guardedRoutes } from "./guardedRoutes"
import { AuthProvider } from "../authprovider"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Nav />
        <Outlet />
      </AuthProvider>
    ),
    children: guardedRoutes,
  },
])
