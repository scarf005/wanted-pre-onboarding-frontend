import { RouteObject } from "react-router-dom"
import { TodoList } from "../todo"
import { paths } from "./paths"
import { SignIn, SignUp } from "../auth"
import { deleteTodo, getTodos, postTodo, updateTodo } from "./api"
import { unsafeFormData, unsafePayload } from "../utils/serialized"
import { signUpAction } from "../auth/signUpAction"
import { signInAction } from "../auth/signInAction"

export type Visibility = "all" | "privateOnly" | "publicOnly"

export type RouteDefinition = RouteObject & {
  path: string
  visibility: Visibility
}

export const routes: RouteDefinition[] = [
  {
    id: "회원가입",
    path: paths.signup,
    element: <SignUp />,
    visibility: "publicOnly",
    action: signUpAction,
  },
  {
    id: "로그인",
    path: paths.signin,
    element: <SignIn />,
    visibility: "publicOnly",
    action: signInAction,
  },
  {
    id: "할 일 목록",
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
        case "PUT":
          await updateTodo(await unsafePayload(request))
          return null
      }
    },
  },
]
