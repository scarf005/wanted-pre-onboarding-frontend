import { Link } from "react-router-dom"
import { routes } from "./routes/routes"
import { CSSProperties, HTMLAttributes } from "react"
import { useAuth } from "./useAuth"

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
  const { status, logout } = useAuth()
  const forbidden = status === "authenticated" ? "publicOnly" : "privateOnly"

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
      {status === "authenticated" && (
        <button type="submit" onClick={logout}>
          로그아웃
        </button>
      )}
    </nav>
  )
}
