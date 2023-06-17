import { test, expect } from "@playwright/test"
import { setupMock } from "./todos.utils"

test.describe("TODO 목록 DELETE", () => {
  // Assignment 9
  test("정방향으로 모두 삭제", async ({ page }) => {
    const {
      getters: { todos, deleteButton },
    } = await setupMock(page, { min: 10, maxCount: 10 })

    const prevTodos = await todos.all()
    const prevTodoCount = prevTodos.length
    for (let i = 0; i < prevTodoCount; i++) {
      await todos.first().locator(deleteButton).click()
      await expect(todos).toHaveCount(prevTodoCount - i - 1)
    }
    await expect(todos).toHaveCount(0)
  })

  test("역방향으로 모두 삭제", async ({ page }) => {
    const {
      getters: { todos, deleteButton },
    } = await setupMock(page, { min: 10, maxCount: 10 })

    const prevTodos = await todos.all()
    const prevTodoCount = prevTodos.length
    for (let i = 0; i < prevTodoCount; i++) {
      await todos.last().locator(deleteButton).click()
      await expect(todos).toHaveCount(prevTodoCount - i - 1)
    }
    await expect(todos).toHaveCount(0)
  })

  test("임의로 선택해가며 모두 삭제", async ({ page }) => {
    const {
      getters: { todos, deleteButton },
    } = await setupMock(page, { min: 10, maxCount: 10 })

    const prevTodos = await todos.all()
    const prevTodoCount = prevTodos.length

    for (let i = 0; i < prevTodoCount; i++) {
      const randomIndex = Math.floor(Math.random() * (await todos.count()))
      await todos
        .nth(randomIndex)
        .locator(deleteButton)
        .click()
      await expect(todos).toHaveCount(prevTodoCount - i - 1)
    }
    await expect(todos).toHaveCount(0)
  })
})
