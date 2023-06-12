import { Link } from "react-router-dom"
import { useLocalJwtStorage } from "./utils/jwt"
import { routes } from "./routes/routes"
import { HTMLAttributes } from "react"
import { useAuth } from "./authprovider"

const ListItem = (
  { children, ...props }: HTMLAttributes<HTMLLIElement>,
) => (
  <li {...props} style={{ margin: "0 1em" }}>
    {children}
  </li>
)

export const Nav = () => {
  const { status } = useAuth()
  const forbidden = status === "authenticated" ? "publicOnly" : "privateOnly"

  const paths = routes
    .filter(({ visibility }) => visibility !== forbidden)
    .map(({ path }) => (
      <ListItem key={path}>
        <Link to={path}>{path}</Link>
      </ListItem>
    ))

  return (
    <nav>
      <ul style={{ display: "flex" }}>
        {paths}
      </ul>
    </nav>
  )
}
