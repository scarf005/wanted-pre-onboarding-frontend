import { test, expect } from "@playwright/test"
import { getSignInButton } from "./auth.utils"

const routes = [{ name: "인덱스 라우트", url: "/" }]

for (const { name, url } of routes) {
  test(`로그인이 되어있지 않으면 ${name}에서 /signin 페이지로 리다이렉트됨`, async ({
    page,
  }) => {
    await page.goto(url)

    await expect(page).toHaveURL(/\/signin$/)
    await expect(getSignInButton(page)).toBeVisible()
  })
}
