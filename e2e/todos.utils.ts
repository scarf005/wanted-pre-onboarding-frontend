import { expect, Page, Locator } from "@playwright/test"
import { setupMockApi, Todo } from "./todos.mock"
import { randomNum } from "./gen.utils"
import { mock_token } from "./mockdata"

type StorageOption = { min?: number; maxCount?: number }

const createTodoStorage = ({ min = 1, maxCount = 6 }: StorageOption): Todo[] =>
  Array.from({ length: randomNum(min, min + maxCount) }, (_, i) => ({
    id: i + 1,
    todo: `todo${i + 1}`,
    isCompleted: randomNum(0, 1) === 1,
    userId: 1,
  }))

export const setupMock = async (page: Page, option?: StorageOption) => {
  const todoStorage = createTodoStorage(option ?? {})

  await setupMockApi(page, todoStorage)
  await page.goto("/signin")
  await page.evaluate(
    (token) => localStorage.setItem("jwt-token", token),
    mock_token,
  )
  await page.goto("/todo")

  const getters = createGetters(page)
  return {
    todoStorage,
    getters,
    checkTodosAreRendered: checkTodosAreRendered(getters, todoStorage),
    checkIsNotEditing: checkIsNotEditing(getters),
    checkIsEditing: checkIsEditing(getters),
  }
}

type Getter = ReturnType<typeof createGetters>

const createGetters = (page: Page) => ({
  todos: page.locator("li > label"),
  span: page.locator("span"),
  checkbox: page.locator("input[type='checkbox']"),
  newTodoInput: page.getByTestId("new-todo-input"),
  newTodoAddButton: page.getByTestId("new-todo-add-button"),
  modifyButton: page.getByTestId("modify-button"),
  deleteButton: page.getByTestId("delete-button"),
  modifyInput: page.getByTestId("modify-input"),
  submitButton: page.getByTestId("submit-button"),
  cancelButton: page.getByTestId("cancel-button"),
})

export const zip = <T, U>(xs: T[], ys: U[]): [T, U][] =>
  xs.map((k, i) => [k, ys[i]])

const checkTodosAreRendered =
  ({ todos, span, checkbox }: Getter, todoStorage: Todo[]) =>
  async () => {
    await expect(todos).toHaveCount(todoStorage.length)

    for (const [todo, mockTodo] of zip(await todos.all(), todoStorage)) {
      await expect(todo.locator(span)).toHaveText(mockTodo.todo)
      await expect(todo.locator(checkbox)).toBeChecked({
        checked: mockTodo.isCompleted,
      })
    }
  }

const checkIsNotEditing =
  ({ modifyInput, span, modifyButton, deleteButton }: Getter) =>
  async (todo: Locator) => {
    await expect(todo.locator(span)).toBeVisible()
    await expect(todo.locator(modifyInput)).not.toBeVisible()
    await expect(todo.locator(modifyButton)).toBeVisible()
    await expect(todo.locator(deleteButton)).toBeVisible()
  }

const checkIsEditing =
  ({ modifyInput, span, modifyButton, deleteButton }: Getter) =>
  async (todo: Locator) => {
    await expect(todo.locator(span)).not.toBeVisible()
    await expect(todo.locator(modifyInput)).toBeVisible()
    await expect(todo.locator(modifyButton)).not.toBeVisible()
    await expect(todo.locator(deleteButton)).not.toBeVisible()
  }
