import { EmailInput, PasswordInput } from "./Inputs"
import { useValidatedInput } from "../utils/useInput"
import { localStorageKey, tid } from "../utils/ids"
import { Link, useNavigate } from "react-router-dom"
import { paths } from "../routes/paths"
import * as api from "../api"

export const useSignIn = () => {
  const navigate = useNavigate()

  const signin = async (request: api.AuthSignInRequest) => {
    const { response, access_token } = await api.signIn(request)
    if (response.ok) {
      console.log("로그인 성공!")
      localStorage.setItem(localStorageKey.jwtToken, access_token)
      navigate(paths.todo)
    } else {
      alert("로그인 실패!")
    }
  }
  return { signin }
}

export const SignIn = () => {
  const { signin } = useSignIn()
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
          signin({ email, password })
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
