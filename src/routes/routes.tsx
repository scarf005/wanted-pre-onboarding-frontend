import { RouteObject } from "react-router-dom"
import { TodoList } from "../todo"
import { paths } from "./paths"
import { SignIn, SignUp } from "../auth"
import { deleteTodo, getTodos, postTodo, updateTodo } from "./api"
import { unsafeFormData, unsafePayload } from "../utils/serialized"

export type Visibility = "all" | "privateOnly" | "publicOnly"

export type RouteDefinition = RouteObject & {
  path: string
  visibility: Visibility
}

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
    action: async ({ request }) => {
      switch (request.method) {
        case "POST":
          return postTodo(await unsafeFormData(request))
        case "DELETE":
          await deleteTodo(await unsafeFormData(request))
          return null
        case "PUT": {
          await updateTodo(await unsafePayload(request))
          return null
        }
        default:
          throw new Response(`알 수 없는 요청 ${request.method}`, {
            status: 405,
          })
      }
    },
  },
]
