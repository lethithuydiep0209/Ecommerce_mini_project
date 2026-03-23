import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="rounded-xl bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold">404 - Page not found</h1>
      <p className="mt-2 text-gray-600">The page you are trying to access does not exist.</p>
      <Link to="/" className="mt-5 inline-block text-orange-600">
        Back to Home
      </Link>
    </section>
  )
}
