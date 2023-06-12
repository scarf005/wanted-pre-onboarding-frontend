import { createBrowserRouter, Outlet } from "react-router-dom"
import { routes } from "./routes"
import { Nav } from "../Nav"

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
      ...routes,
    ],
  },
])
