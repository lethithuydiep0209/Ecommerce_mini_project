import { useToast } from '../context/ToastContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className="block rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg"
        >
          {toast.message}
        </button>
      ))}
    </div>
  )
}
