import { test, expect } from "@playwright/test"
import { setupMock } from "./todos.utils"

test.describe("TODO 목록 GET", () => {
  // Assignment 5
  test("로그인 상태에서 접근 시 TODO 목록이 보여야 함", async ({ page }) => {
    const min = 4
    const {
      checkTodosAreRendered,
      getters: { todos },
    } = await setupMock(page, { min })

    await checkTodosAreRendered()
    await page.reload()
    await checkTodosAreRendered()

    // 최소 주어진 개수 이상의 TODO가 보여야 함
    expect(await todos.count()).toBeGreaterThanOrEqual(min)
  })
})
