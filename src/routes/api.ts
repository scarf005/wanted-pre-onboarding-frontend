import ky from "ky"
import { localStorageKey } from "../utils/ids"
import { fromPromise } from "../utils/Result"

export type Todo = {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

// Auth
export type AuthForm = {
  email: string
  password: string
}

export type SignInRes = {
  access_token: string
}

type AuthFailRes = {
  statusCode: number
  message: string
  error: string
}

// Crud
export type TodoPostReq = Pick<Todo, "todo">

export type TodoPostRes = Todo

export type TodoGetRes = Todo[]

export type TodoPutReq = Omit<Todo, "userId">

export type TodoPutRes = Todo

export type TodoDeleteReq = Pick<Todo, "id">

const apiUrl = "https://www.pre-onboarding-selection-task.shop" as const

const api = ky.create({
  prefixUrl: apiUrl,
})

const apiAuthed = () => {
  const token = localStorage.getItem(localStorageKey.jwtToken)
  return api.extend({ headers: { Authorization: `Bearer ${token}` } })
}

// Auth
const authUrl = "auth" as const

export const signUp = (json: AuthForm) =>
  fromPromise<unknown, AuthFailRes>(api.post(`${authUrl}/signup`, { json }))

export const signIn = (json: AuthForm) =>
  fromPromise<SignInRes, AuthFailRes>(
    api.post(`${authUrl}/signin`, { json }).json(),
  )

// Todo
const todoUrl = "todos" as const

export const getTodos = () => apiAuthed().get(todoUrl).json<TodoGetRes>()

export const postTodo = (todo: TodoPostReq) =>
  apiAuthed().post(todoUrl, { json: todo }).json<TodoPostRes>()

export const updateTodo = (todo: TodoPutReq) =>
  apiAuthed().put(`${todoUrl}/${todo.id}`, { json: todo }).json<TodoPutRes>()

export const deleteTodo = ({ id }: TodoDeleteReq) =>
  apiAuthed().delete(`${todoUrl}/${id}`)
