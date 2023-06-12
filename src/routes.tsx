import { redirect, RouteObject } from "react-router-dom"
import { SignIn, SignUp } from "./auth"
import { TodoList } from "./todo/TodoList"
import { jwtStorage } from "./utils/storage"

export const paths = {
  signin: "/signin",
  signup: "/signup",
  todo: "/todo",
} as const

export const redirectToTodo = async () =>
  jwtStorage.get() ? redirect(paths.todo) : null
export const redirectToSignin = async () =>
  jwtStorage.get() ? null : redirect(paths.signin)

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

export const guardedRoutes = routes
  .map(({ visibility, ...args }) => ({
    ...args,
    loader: visibility ? redirectToSignin : redirectToTodo,
  }))
