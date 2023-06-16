import { RouteObject } from "react-router-dom"
import { TodoList } from "../todo"
import { paths } from "./paths"
import { SignIn, SignUp } from "../auth"
import { getTodos } from "../api"

export type Visibility = "all" | "privateOnly" | "publicOnly"

export type RouteDefinition = RouteObject & { path: string; visibility: Visibility }

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
    loader: getTodos,
  },
]
