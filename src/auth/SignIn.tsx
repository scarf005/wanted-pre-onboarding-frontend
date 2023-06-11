import { routes } from "../routes"
import { EmailInput, PasswordInput } from "./Inputs"
import { useInput } from "./useInput"
import { tid } from "../utils/testid"

export const SignIn = () => {
  const emailInput = useInput()
  const passwordInput = useInput()

  const email = emailInput.value
  const password = passwordInput.value
  const isInvalid = [emailInput, passwordInput]
    .every(({ state: { type } }) => type === "err")

  return (
    <main>
      <header>
        <h1>로그인</h1>
      </header>
      <form
        onSubmit={(e) => {
          e.currentTarget.preventDefault()
          alert(`email: ${email}, password: ${password}`)
        }}
      >
        <fieldset>
          <EmailInput {...emailInput} />
          <PasswordInput
            {...passwordInput}
            inputProps={{ autoComplete: "current-password" }}
          />
        </fieldset>
        <button
          type="submit"
          data-testid={tid.signinButton}
          disabled={isInvalid}
        >
          로그인
        </button>
      </form>
      <nav>
        <h2>아직 회원이 아니신가요?</h2>
        <a href={routes.signin}>
          회원가입하기
        </a>
      </nav>
    </main>
  )
}
