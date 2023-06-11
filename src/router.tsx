import { createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import { SignIn, SignUp } from "./auth"
import { TodoList } from "./todo/TodoList"

export const router = createBrowserRouter([
  {
    path: routes.signup,
    element: <SignUp />,
  },
  {
    path: routes.signin,
    element: <SignIn />,
  },
  {
    path: routes.todo,
    element: <TodoList />,
  },
])
