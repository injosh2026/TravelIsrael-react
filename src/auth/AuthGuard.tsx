//להגן על עמודים שדורשים משתמש מחובר
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../auth/useAuthContext"

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {

  const { isAuthenticated, isInitializing } = useAuthContext()

  if (isInitializing) {
    return <div>טוען...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <>
  {children}
  </>
}