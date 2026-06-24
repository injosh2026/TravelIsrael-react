//להגן על עמודים שדורשים משתמש מחובר
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../auth/useAuthContext"

type Props = {
  children: React.ReactNode
}

export default function AdminGuard({ children }: Props) {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) {
    return <div>טוען...</div>
  }

  const isAdmin = user?.role === 'Admin'

  if (!isAdmin) {
    return <Navigate to="/home" replace />
  }

  return <>
  {children}
  </>
}