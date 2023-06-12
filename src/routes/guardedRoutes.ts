import { routes } from "./routes"
import { redirect } from "react-router-dom"
import { jwtStorage } from "../utils/storage"
import { paths } from "./paths"

export const redirectToTodo = async () =>
  jwtStorage.get() ? redirect(paths.todo) : null

export const redirectToSignin = async () =>
  jwtStorage.get() ? null : redirect(paths.signin)

export const guardedRoutes = routes
  .map(({ visibility, ...args }) => ({
    ...args,
    loader: visibility ? redirectToSignin : redirectToTodo,
  }))
