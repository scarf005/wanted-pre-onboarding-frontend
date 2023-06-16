import { useNavigate } from "react-router-dom"
import { paths } from "./paths"
import { ReactNode } from "react"
import { isAuthenticated } from "../Nav"

type Props = { children: ReactNode }
export const PrivateOnlyRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const authed = isAuthenticated()

  if (!authed) {
    console.log("not authenticated, redirect to signin")
    navigate(paths.signin)
  }
  return <>{children}</>
}

export const PublicOnlyRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const authed = isAuthenticated()

  if (authed) {
    console.log("already authenticated, redirect to todo")
    navigate(paths.todo)
  }
  return <>{children}</>
}
