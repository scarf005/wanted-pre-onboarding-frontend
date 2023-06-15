import { EmailInput, PasswordInput } from "./Inputs"
import { useValidatedInput } from "../utils/useInput"
import { tid } from "../utils/ids"
import { Link } from "react-router-dom"
import { paths } from "../routes/paths"
import { useAuth } from "../useAuth"

export const SignIn = () => {
  const auth = useAuth()
  const emailInput = useValidatedInput()
  const passwordInput = useValidatedInput()

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
          e.preventDefault()
          auth.login({ email, password })
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
        <Link to={paths.signup}>
          회원가입하기
        </Link>
      </nav>
    </main>
  )
}
