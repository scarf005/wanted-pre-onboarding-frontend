import ky from "ky"
import { localStorageKey } from "./utils/ids"

export type Todo = {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

// Auth
export type AuthSignUpRequest = {
  email: string
  password: string
}

export type AuthSignInRequest = {
  email: string
  password: string
}

export type AuthSignInResponse = {
  access_token: string
}

// Crud
export type TodoCreateRequest = Todo["todo"]

export type TodoCreateResponse = Todo

export type TodoGetResponse = Todo[]

export type TodoUpdateRequest = Omit<Todo, "userId">

export type TodoUpdateResponse = Todo

export type TodoDeleteRequest = Pick<Todo, "id">

const api = ky.create({
  prefixUrl: "https://www.pre-onboarding-selection-task.shop",
})

const apiAuthed = () => {
  const token = localStorage.getItem(localStorageKey.jwtToken)
  return api.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
// Auth
export const signUp = async (request: AuthSignUpRequest) => {
  await api.post("auth/signup", { json: request })
}

export const signIn = async (request: AuthSignInRequest) => {
  const response = await api
    .post("auth/signin", { json: request })
    .json<AuthSignInResponse>()
  localStorage.setItem(localStorageKey.jwtToken, response.access_token)
  return response
}

// Todo
export const postTodo = async (request: TodoCreateRequest) => {
  const response = await apiAuthed()
    .post("todos", { json: request })
    .json<TodoCreateResponse>()
  return response
}

export const getTodos = async () => {
  const response = await apiAuthed()
    .get("todos")
    .json<TodoGetResponse>()
  return response
}

export const updateTodo = async (request: TodoUpdateRequest) => {
  const response = await apiAuthed()
    .put(`todos/${request.id}`, { json: request })
    .json<TodoUpdateResponse>()
  return response
}

export const deleteTodo = async ({ id }: TodoDeleteRequest) => {
  await apiAuthed().delete(`todos/${id}`, {})
}

export type AuthApi = {
  signUp: (request: AuthSignUpRequest) => Promise<void>
  signIn: (request: AuthSignInRequest) => Promise<AuthSignInResponse>
}

export type TodoApi = {
  getTodos: () => Promise<TodoGetResponse>
  postTodo: (request: TodoCreateRequest) => Promise<TodoCreateResponse>
  updateTodo: (request: TodoUpdateRequest) => Promise<TodoUpdateResponse>
  deleteTodo: (request: TodoDeleteRequest) => Promise<void>
}
