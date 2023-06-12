import { Link } from "react-router-dom"
import { useJwtStorage } from "./utils/storage"
import { routes } from "./routes"

export const Nav = () => {
  const [token] = useJwtStorage()
  const forbidden = token ? "publicOnly" : "privateOnly"

  const paths = routes
    .filter(({ visibility }) => visibility !== forbidden)
    .map(({ path }) => (
      <li key={path} style={{ margin: "0 1em" }}>
        <Link to={path}>{path}</Link>
      </li>
    ))

  return (
    <nav>
      <ul style={{ display: "flex" }}>
        {paths}
      </ul>
    </nav>
  )
}
