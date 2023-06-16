import ky from "ky"
import { localStorageKey } from "../utils/ids"

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
export type TodoCreateRequest = Pick<Todo, "todo">

export type TodoCreateResponse = Todo

export type TodoGetResponse = Todo[]

export type TodoUpdateRequest = Omit<Todo, "userId">

export type TodoUpdateResponse = Todo

export type TodoDeleteRequest = Pick<Todo, "id">

const apiUrl = "https://www.pre-onboarding-selection-task.shop"

const api = ky.create({
  prefixUrl: apiUrl,
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
export const signUp = async (request: AuthSignUpRequest) =>
  await api.post("auth/signup", { json: request })

export const signIn = async (request: AuthSignInRequest) => {
  const response = await api.post("auth/signin", { json: request })

  const { access_token } = await response.json<AuthSignInResponse>()

  return { response, access_token }
}

// Todo
export const postTodo = async (todo: TodoCreateRequest) => {
  const response = await apiAuthed()
    .post("todos", { json: todo })
    .json<TodoCreateResponse>()
  return response
}

export const getTodos = async () => {
  const response = await apiAuthed()
    .get("todos")
    .json<TodoGetResponse>()
  return response
}

export const updateTodo = async (todo: TodoUpdateRequest) => {
  const response = await apiAuthed()
    .put(`todos/${todo.id}`, { json: todo })
    .json<TodoUpdateResponse>()
  return response
}

export const deleteTodo = async ({ id }: TodoDeleteRequest) => {
  await apiAuthed().delete(`todos/${id}`)
}
