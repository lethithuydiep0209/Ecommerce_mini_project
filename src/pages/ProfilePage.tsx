import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <section className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <div className="mt-5 space-y-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
          <p className="text-sm font-medium text-gray-900">{user.email}</p>
        </div>
      </div>
    </section>
  )
}
