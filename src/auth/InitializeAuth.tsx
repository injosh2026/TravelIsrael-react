import { useEffect } from "react"
import { useLoadUser } from "../hooks/useLoadUser"
import { useAuthContext } from "./useAuthContext"
import { getAccessToken, setSession } from "./auth.utils"

type Props = {
  children: React.ReactNode
}

export default function InitializeAuth({ children }: Props) {

  const loadUser = useLoadUser()
  const { finishAuthInit } = useAuthContext()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAccessToken()

        if (token) {
          setSession(token, localStorage.getItem("refreshToken") || "")
          await loadUser()
        }
      } finally {
        finishAuthInit()
      }
    }

    initAuth()
  }, [])

  return <>{children}</>
}
