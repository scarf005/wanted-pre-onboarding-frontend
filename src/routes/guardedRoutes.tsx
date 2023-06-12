import { routes } from "./routes"
import { useNavigate } from "react-router-dom"
import { paths } from "./paths"
import { ReactNode } from "react"
import { useAuth } from "../authprovider"

type Props = { children: ReactNode }
export const PrivateOnlyRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const { status } = useAuth()

  if (status === "unauthenticated") {
    console.log("not authenticated, redirect to signin")
    navigate(paths.signin)
  }
  return <>{children}</>
}
export const PublicOnlyRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const { status } = useAuth()

  if (status === "authenticated") {
    console.log("already authenticated, redirect to todo")
    navigate(paths.todo)
  }
  return <>{children}</>
}

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
