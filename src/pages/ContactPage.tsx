import type { FormEvent } from 'react'
import { useState } from 'react'
import Button from '../components/Button'

type FormState = {
  name: string
  email: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [success, setSuccess] = useState('')

  const validate = () => {
    const nextErrors: Partial<FormState> = {}

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Invalid email format.'
    }

    if (!form.message.trim()) nextErrors.message = 'Please enter your message.'
    else if (form.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccess('')
    if (!validate()) return
    setSuccess('Message sent successfully. We will get back to you soon.')
    setForm(initialForm)
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">Contact</h1>
      <p className="mt-2 text-sm text-gray-600">
        Contact form with validation and friendly feedback.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        <Button type="submit">Send message</Button>
      </form>

      {success && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </p>
      )}
    </section>
  )
}
