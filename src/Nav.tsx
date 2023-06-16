import { Form, useLoaderData } from "react-router-dom"
import { CSSProperties } from "react"
import { LoaderData } from "./routes/type"
import { isAuthenticated } from "./routes/router"

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

export const Nav = () => {
  const authenticated = useLoaderData() as LoaderData<typeof isAuthenticated>

  return <nav style={navStyle}>{authenticated && <Logoutbutton />}</nav>
}

export const Logoutbutton = () => (
  <Form method="POST">
    <button type="submit" name="auth" value="logout">
      로그아웃
    </button>
  </Form>
)
