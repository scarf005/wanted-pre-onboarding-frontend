import { Form, Link, useNavigate } from "react-router-dom"
import { routes } from "./routes/routes"
import { CSSProperties, HTMLAttributes, MouseEvent } from "react"
import { localStorageKey } from "./utils/ids"

export const isAuthenticated = () =>
  localStorage.getItem(localStorageKey.jwtToken) !== null

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
