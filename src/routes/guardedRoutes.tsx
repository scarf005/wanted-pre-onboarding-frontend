import { routes } from "./routes"
import { PrivateOnlyRoute, PublicOnlyRoute } from "./GuardedRoute"

export const guardedRoutes = routes
  .map(({ visibility, element, ...args }) => ({
    ...args,
    element: (() => {
      switch (visibility) {
        case "publicOnly":
          return <PublicOnlyRoute>{element}</PublicOnlyRoute>
        case "privateOnly":
          return <PrivateOnlyRoute>{element}</PrivateOnlyRoute>
        default:
          return element
      }
    })(),
  }))
