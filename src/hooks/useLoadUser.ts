import { useAuthContext } from "../auth/useAuthContext"
import { getCurrentUser } from "../services/auth.service"

export const useLoadUser = () => {

  const { setUser } = useAuthContext()

  const loadUser = async () => {
    try {
      const user = await getCurrentUser()
      setUser(user)
    } catch (error) {
      console.error("Failed to load user", error)
    }
  }

  return loadUser
}