import { test } from "@playwright/test"
import { setupMock } from "./todos.utils"

test.describe("TODO 목록 GET", () => {
  // Assignment 5
  test("로그인 상태에서 접근 시 TODO 목록이 보여야 함", async ({ page }) => {
    const { checkTodosAreRendered } = await setupMock(page)

    await checkTodosAreRendered()
    await page.reload()
    await checkTodosAreRendered()
  })
})
