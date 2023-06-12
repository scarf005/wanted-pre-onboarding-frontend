import { RouteObject } from "react-router-dom"
import { SignIn, SignUp } from "../auth"
import { TodoList } from "../todo/TodoList"
import { paths } from "./paths"

type Visibility = "all" | "privateOnly" | "publicOnly"

type RouteDefinition = RouteObject & { path: string; visibility: Visibility }

export const routes: RouteDefinition[] = [
  {
    path: paths.signup,
    element: <SignUp />,
    visibility: "publicOnly",
  },
  {
    path: paths.signin,
    element: <SignIn />,
    visibility: "publicOnly",
  },
  {
    path: paths.todo,
    element: <TodoList />,
    visibility: "privateOnly",
  },
]
