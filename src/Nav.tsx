import { Form, Link, useNavigate } from "react-router-dom"
import { routes } from "./routes/routes"
import { CSSProperties, HTMLAttributes, MouseEvent } from "react"
import { localStorageKey } from "./utils/ids"
import { paths } from "./routes/paths"

export const isAuthenticated = () =>
  localStorage.getItem(localStorageKey.jwtToken) !== null

export const useLogout = () => {
  const navigate = useNavigate()

  const logout = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    localStorage.removeItem(localStorageKey.jwtToken)
    navigate(paths.signin)
  }
  return { logout }
}

const ListItem = (
  { children, ...props }: HTMLAttributes<HTMLLIElement>,
) => (
  <li {...props} style={{ margin: "0 1em" }}>
    {children}
  </li>
)

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const ulStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  margin: "0 0 0 0",
}

export const Nav = () => {
  const { logout } = useLogout()
  const authenticated = isAuthenticated()
  const forbidden = authenticated ? "publicOnly" : "privateOnly"

  const paths = routes
    .filter(({ visibility }) => visibility !== forbidden)
    .map(({ path }) => (
      <ListItem key={path}>
        <Link to={path}>{path}</Link>
      </ListItem>
    ))

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {paths}
      </ul>
      {authenticated && (
        <Form method="POST">
          <button type="submit" name="logout">
            로그아웃
          </button>
        </Form>
      )}
    </nav>
  )
}
