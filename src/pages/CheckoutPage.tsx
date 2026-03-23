import type { FormEvent } from 'react'
import { useState } from 'react'
import Button from '../components/Button'

type CheckoutForm = {
  name: string
  phone: string
  address: string
  note: string
}

const initialForm: CheckoutForm = {
  name: '',
  phone: '',
  address: '',
  note: '',
}

export default function CheckoutPage() {
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})
  const [success, setSuccess] = useState('')

  const validate = () => {
    const nextErrors: Partial<CheckoutForm> = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    else if (!/^(0|\+84)\d{9,10}$/.test(form.phone.replace(/\s/g, ''))) {
      nextErrors.phone = 'Invalid phone number format.'
    }
    if (!form.address.trim()) nextErrors.address = 'Please enter your address.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccess('')
    if (!validate()) return
    setSuccess('Order placed successfully! Your order is being processed.')
    setForm(initialForm)
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-gray-500">Please fill in your shipping information.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Address</label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Note</label>
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
          />
        </div>
        <Button type="submit">Place order</Button>
      </form>

      {success && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </p>
      )}
    </section>
  )
}
