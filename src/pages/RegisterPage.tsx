import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

type RegisterForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialForm: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterForm>(initialForm)
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('All fields are required.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = register(form.name.trim(), form.email.trim(), form.password)
    if (!result.ok) {
      setError(result.message ?? 'Registration failed.')
      return
    }
    navigate('/login')
  }

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Register</h1>
      <p className="mt-1 text-sm text-gray-500">Create your account to start shopping.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-orange-600">
          Login here
        </Link>
      </p>
    </section>
  )
}
