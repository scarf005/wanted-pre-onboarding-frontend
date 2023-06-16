import { EmailInput, PasswordInput } from "./Inputs"
import { useValidatedInput } from "../utils/useInput"
import { tid } from "../utils/ids"
import { Form, Link } from "react-router-dom"
import { paths } from "../routes/paths"
import classes from "./auth.module.css"

export const SignIn = () => (
  <main>
    <Header />
    <SignInForm />
    <ToSignUp />
  </main>
)

const Header = () => (
  <header>
    <h1>로그인</h1>
  </header>
)

const SignInForm = () => {
  const email = useValidatedInput()
  const password = useValidatedInput()
  const isInvalid = [email, password].some((x) => x.state.type !== "ok")

  return (
    <Form method="POST" className={classes.center}>
      <fieldset>
        <EmailInput {...email} />
        <PasswordInput
          {...password}
          inputProps={{ autoComplete: "current-password" }}
        />
      </fieldset>
      <Submit isInvalid={isInvalid} />
    </Form>
  )
}

const Submit = ({ isInvalid }: { isInvalid: boolean }) => (
  <button type="submit" data-testid={tid.signinButton} disabled={isInvalid}>
    로그인
  </button>
)

const ToSignUp = () => {
  const { signup } = paths
  return (
    <nav aria-labelledby={signup}>
      <h2>아직 회원이 아니신가요?</h2>
      <Link to={signup} id={signup}>
        회원가입하기
      </Link>
    </nav>
  )
}
