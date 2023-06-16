import { routes, Visibility } from "./routes"
import { LoaderFunction, redirect } from "react-router-dom"
import { paths } from "./paths"
import { isAuthenticated } from "./rootRoutes"

type Option = {
  visibility: Visibility
  loader?: LoaderFunction
}
const guardLoader =
  ({ visibility, loader }: Option) =>
  async () => {
    const authed = isAuthenticated()
    const load = () => (loader as () => Promise<Response>)?.() ?? null

    switch (visibility) {
      case "publicOnly":
        return authed ? redirect(paths.todo) : load()
      case "privateOnly":
        return authed ? load() : redirect(paths.signin)
      case "all":
        return load()
    }
  }

export const guardedRoutes = routes.map(({ visibility, loader, ...args }) => ({
  ...args,
  loader: guardLoader({ visibility, loader }),
}))
