import { routes, Visibility } from "./routes"
import { isAuthenticated } from "../Nav"
import { LoaderFunction, redirect } from "react-router-dom"
import { paths } from "./paths"

const toTodo = () => redirect(paths.todo)
const toSignIn = () => redirect(paths.signin)

type Option = {
  visibility: Visibility
  loader: LoaderFunction | undefined
}
const guardLoader = (
  { visibility, loader }: Option,
) => {
  const authed = isAuthenticated()

  switch (visibility) {
    case "publicOnly":
      return authed ? toTodo : loader
    case "privateOnly":
      return authed ? loader : toSignIn
    case "all":
      return loader
  }
}

export const guardedRoutes = routes
  .map(({ visibility, loader, ...args }) => ({
    ...args,
    loader: guardLoader({ visibility, loader }),
  }))
