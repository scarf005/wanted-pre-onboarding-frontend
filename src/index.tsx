import React from "react"
import ReactDOM from "react-dom/client"

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { rootRoutes } from "./routes/rootRoutes"

import "./normalize.css"
import "./sakura.css"
import "./index.css"

const router = createBrowserRouter(rootRoutes)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
