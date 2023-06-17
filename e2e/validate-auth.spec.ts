/**
 * Assignment 1
 * @see https://github.com/walking-sunset/selection-task/blob/d8aead05a8be48a40274ec9e275a2b53495407f7/README.md?plain=1#L97-L106
 */

/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page } from "@playwright/test"
import {
  getSignInButton,
  fillAuth,
  getEmailInput,
  getPasswordInput,
} from "./auth.utils"
import {
  genRandomValidEmail,
  randomNum,
  randomString,
  randomUnicodeWithoutAt,
} from "./gen.utils"

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
      await fillAuth(page, { email: randomUnicodeWithoutAt(randomNum(1, 10)) })
      await expect(page.getByTestId(buttonId)).toBeDisabled()
    })

    test(`이메일은 @ 를 포함만 하면 됨`, async ({ page }) => {
      await page.goto(url)
      await fillAuth(page, {})
      const [begin, end] = [
        randomUnicodeWithoutAt(randomNum(1, 10)),
        randomUnicodeWithoutAt(randomNum(1, 10)),
      ]
      const cases = [
        "@",
        "@!",
        "@@",
        "*@*",
        "오@",
        "a@b",
        "foo@bar",
        "foo@bar.com",
        `@${begin}`,
        `${begin}@`,
        `${begin}@${end}`,
        `.&*^^%&*(*(^(&*)))@`,
        "안녕 세상 @",
        ...Array.from({ length: 10 }, genRandomValidEmail),
      ]
      for (const email of cases) {
        await getEmailInput(page).fill(email)
        await expect(page.getByTestId(buttonId)).toBeEnabled()
      }
    })

    test(`비밀번호 길이가 8보다 짧을시 ${buttonName} 버튼이 활성화되지 않음`, async ({
      page,
    }) => {
      await page.goto(signin)
      for (const password of ["", ".&*#@", randomString(randomNum(0, 7))]) {
        await fillAuth(page, { password })
        await expect(getSignInButton(page)).toBeDisabled()
      }
    })

    test(`비밀번호는 어떤 문자열이든 8글자 이상이면 됨`, async ({ page }) => {
      await page.goto(signin)
      await fillAuth(page, {})
      for (const password of [
        "안녕 세상 !!!!!!!!",
        "foobarbaz",
        ".894(*ㄴ^(&*&(ㅃ꽈ㅓㄲ ㅡ(8929&*@^$(*@)(",
        genRandomValidEmail() + randomString(randomNum(8, 10)),
        randomString(randomNum(8, 10)),
        randomUnicodeWithoutAt(randomNum(8, 10)),
        ...Array.from({ length: 10 }, () => randomString(randomNum(8, 30))),
      ]) {
        await getPasswordInput(page).fill(password)
        await expect(getSignInButton(page)).toBeEnabled()
      }
    })
  })
}
