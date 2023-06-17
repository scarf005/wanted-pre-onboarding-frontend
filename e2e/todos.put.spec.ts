/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test"
import { setupMock, zip } from "./todos.utils"

test.describe("TODO 목록 PUT", () => {
  // Assignment 7
  test("TODO 완료 상태 변경", async ({ page }) => {
    const {
      todoStorage,
      getters: { todos },
      checkTodosAreRendered,
    } = await setupMock(page)

    const prevCompletions = todoStorage.map((todo) => todo.isCompleted)

    for (const [todo, prev] of zip(await todos.all(), prevCompletions)) {
      const checkbox = todo.locator("input[type='checkbox']")
      await checkbox.click()
      await expect(checkbox).toBeChecked({ checked: !prev })
    }
    await checkTodosAreRendered()
  })

  // // Assignment 8
  // test("should display modify and delete buttons", async ({ page }) => {
  //   const todoStorage = createTodoStorage()
  //   await setupMock(page, todoStorage)
  //   const modifyButton = await page.$(
  //     'li:first-child > button[data-testid="modify-button"]',
  //   )
  //   const deleteButton = await page.$(
  //     'li:first-child > button[data-testid="delete-button"]',
  //   )

  //   expect(Boolean(modifyButton)).toEqual(true)
  //   expect(Boolean(deleteButton)).toEqual(true)
  // })

  // // Assignment 10
  // test("should update a todo", async ({ page }) => {
  //   const todoStorage = createTodoStorage()
  //   await setupMock(page, todoStorage)
  //   const newTodo = "updated todo"

  //   await page.click('li:first-child > button[data-testid="modify-button"]')
  //   await page.fill(
  //     'li:first-child > input[data-testid="modify-input"]',
  //     newTodo,
  //   )
  //   await page.click('li:first-child > button[data-testid="submit-button"]')

  //   const firstTodo = await page.$("li:first-child > label > span")
  //   expect(await firstTodo?.textContent()).toBe(newTodo)
  // })
})
