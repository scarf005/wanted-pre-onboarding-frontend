import { RouteObject } from "react-router-dom"
import { TodoList } from "../todo"
import { paths } from "./paths"
import { SignIn, SignUp } from "../auth"
import { getTodos, postTodo, TodoCreateRequest } from "../api"

export type Visibility = "all" | "privateOnly" | "publicOnly"

export type RouteDefinition = RouteObject & {
  path: string
  visibility: Visibility
}

export const unsafeFormData = async <T,>(request: Request) =>
  Object.fromEntries(await request.formData()) as T

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
    action: async ({ request }) =>
      postTodo(await unsafeFormData<TodoCreateRequest>(request)),
  },
]
