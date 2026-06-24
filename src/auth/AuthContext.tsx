import { createContext, useState, type ReactNode } from "react"
import type { UserType } from "../types/user.type"
import { removeSession } from "./auth.utils"

type AuthStateType = {
  user: UserType | null
}

type AuthContextType = AuthStateType & {
  setUser: (user: UserType) => void
  isAuthenticated: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {

  const [authState, setAuthState] = useState<AuthStateType>({
    user: null,
  })

  const setUser = (user: UserType) => {
    setAuthState({ user})
  }

  const logout = () => {
    setAuthState({ user: null }) // מחיקת המשתמש מהקונטקסט
    removeSession() // קריאה לפונקציה שלך שמוחקת טוקן מהlocalStorage ומאפס את axios
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUser,
        logout,
        isAuthenticated: !!authState.user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}