//כאשר האפליקציה נטענת (לאחר refresh)
//הוא בודק אם יש token שמור.
import { useEffect } from "react"
import { useLoadUser } from "../hooks/useLoadUser"
import { getAccessToken, setSession } from "./auth.utils"

type Props = {
  children: React.ReactNode
}

export default function InitializeAuth({ children }: Props) {

  const loadUser = useLoadUser()

  useEffect(() => {

    const token = getAccessToken()

    if (token) {
      setSession(token, localStorage.getItem("refreshToken") || "")
      loadUser()
    }

  }, [])

  return <>{children}</>
}