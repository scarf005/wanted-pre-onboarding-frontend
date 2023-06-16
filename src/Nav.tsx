import { Form, Link, useLoaderData } from "react-router-dom"
import { routes } from "./routes/routes"
import { CSSProperties, HTMLAttributes } from "react"
import { LoaderData } from "./routes/type"
import { isAuthenticated } from "./routes/router"

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
  const authenticated = useLoaderData() as LoaderData<typeof isAuthenticated>
  console.log({ authenticated })
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
      {authenticated && <Logoutbutton />}
    </nav>
  )
}

export const Logoutbutton = () => (
  <Form method="POST">
    <button type="submit" name="auth" value="logout">
      로그아웃
    </button>
  </Form>
)
