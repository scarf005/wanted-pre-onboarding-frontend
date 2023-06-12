import { useContext } from "react"
import { AuthContext } from "./authprovider"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      "AuthContext is not provided. Check that you used <AuthProvider>",
    )
  }
  return context
}
