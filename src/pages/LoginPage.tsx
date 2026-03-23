import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const result = login(email.trim(), password)
    if (!result.ok) {
      setError(result.message ?? 'Login failed.')
      return
    }
    navigate('/')
  }

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Login</h1>
      <p className="mt-1 text-sm text-gray-500">Sign in to your Mini Shoppe account.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-orange-600">
          Register here
        </Link>
      </p>
    </section>
  )
}
