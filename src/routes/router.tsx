import { createBrowserRouter, createHashRouter } from "react-router-dom"
import { rootRoutes } from "./rootRoutes"

console.log(
  process.env.NODE_ENV === "production"
    ? "using HashRouter"
    : "using BrowserRouter",
)
const wrapper =
  process.env.NODE_ENV === "production" ? createHashRouter : createBrowserRouter

export const router = wrapper(rootRoutes)
