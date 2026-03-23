import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

type Toast = { id: number; message: string }

type ToastContextValue = {
  toasts: Toast[]
  showToast: (message: string) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      showToast: (message: string) => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message }])
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, 1800)
      },
      removeToast: (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      },
    }),
    [toasts],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
