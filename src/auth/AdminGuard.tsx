//להגן על עמודים שדורשים משתמש מחובר
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../auth/useAuthContext"

type Props = {
  children: React.ReactNode
}

export default function AdminGuard({ children }: Props) {
  const isAdmin = useAuthContext().user?.role === 'Admin'

  if (!isAdmin) {
    return <Navigate to="/home" replace />
  }

  return <>
  {children}
  </>
}