/**
 * Assignment 1
 * @see https://github.com/walking-sunset/selection-task/blob/d8aead05a8be48a40274ec9e275a2b53495407f7/README.md?plain=1#L97-L106
 */

/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page } from "@playwright/test"
import { getSignInButton, fillAuth } from "./auth.utils"
import { genRandomNumstring } from "./gen.utils"

const signin = "/signin"

const pages = [
  { url: "/signin", buttonName: "로그인", buttonId: "signin-button" },
  { url: "/signup", buttonName: "회원가입", buttonId: "signup-button" },
]

for (const { url, buttonName, buttonId } of pages) {
  test.describe(url, () => {
    test(`페이지 처음 로드시 ${buttonName} 버튼이 비활성화됨`, async ({
      page,
    }) => {
      await page.goto(url)
      await expect(page.getByTestId(buttonId)).toBeDisabled()
    })

    test(`입력이 올바를 시 ${buttonName} 버튼이 활성화됨`, async ({ page }) => {
      await page.goto(url)
      await fillAuth(page, {})
      await expect(page.getByTestId(buttonId)).toBeEnabled()
    })

    test(`이메일에 @ 가 없으면 ${buttonName} 버튼이 활성화되지 않음`, async ({
      page,
    }) => {
      await page.goto(url)
      await fillAuth(page, { email: genRandomNumstring(0, 20) })
      await expect(page.getByTestId(buttonId)).toBeDisabled()
    })

    test(`비밀번호 길이가 8보다 짧을시 ${buttonName} 버튼이 활성화되지 않음`, async ({
      page,
    }) => {
      await page.goto(signin)
      await fillAuth(page, { password: genRandomNumstring(0, 7) })
      await expect(getSignInButton(page)).toBeDisabled()
    })
  })
}
