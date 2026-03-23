import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type UserRecord = {
  name: string
  email: string
  password: string
}

type SessionUser = {
  name: string
  email: string
}

type AuthContextValue = {
  user: SessionUser | null
  login: (email: string, password: string) => { ok: boolean; message?: string }
  register: (name: string, email: string, password: string) => { ok: boolean; message?: string }
  logout: () => void
}

const AUTH_SESSION_KEY = 'mini-shoppe-session'
const AUTH_USERS_KEY = 'mini-shoppe-users'
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const raw = localStorage.getItem(AUTH_SESSION_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as SessionUser
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_SESSION_KEY)
    }
  }, [user])

  const getUsers = (): UserRecord[] => {
    const raw = localStorage.getItem(AUTH_USERS_KEY)
    if (!raw) return []
    try {
      return JSON.parse(raw) as UserRecord[]
    } catch {
      return []
    }
  }

  const login = (email: string, password: string) => {
    const users = getUsers()
    const matched = users.find((item) => item.email === email && item.password === password)
    if (!matched) {
      return { ok: false, message: 'Invalid email or password.' }
    }
    setUser({ name: matched.name, email: matched.email })
    return { ok: true }
  }

  const register = (name: string, email: string, password: string) => {
    const users = getUsers()
    if (users.some((item) => item.email === email)) {
      return { ok: false, message: 'Email is already registered.' }
    }
    const nextUsers = [...users, { name, email, password }]
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(nextUsers))
    return { ok: true }
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
