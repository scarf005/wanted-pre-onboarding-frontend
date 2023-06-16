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
export const signUp = (request: AuthSignUpRequest) =>
  fromPromise(api.post("auth/signup", { json: request }))

export const signIn = (request: AuthSignInRequest) =>
  fromPromise(
    api.post("auth/signin", { json: request })
      .json<AuthSignInResponse>(),
  )

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
