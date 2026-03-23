import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCart } from '../context/CartContext'
import { useFetch } from '../hooks/useFetch'
import { getProductById } from '../services/api.js'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const fetchProduct = useCallback(
    () => getProductById(Number(productId)),
    [productId],
  )

  const { data, loading, error } = useFetch<Product>(fetchProduct)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!data) return <ErrorMessage message="Product not found." />

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <Link to="/products" className="mb-4 inline-block text-sm text-orange-600">
        ← Back to products
      </Link>
      <div className="grid gap-6 md:grid-cols-2">
        <img src={data.image} alt={data.title} className="h-80 w-full object-contain" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          <p className="mt-2 text-sm capitalize text-gray-500">{data.category}</p>
          <p className="mt-3 text-2xl font-bold text-orange-600">{formatPrice(data.price)}</p>
          <p className="mt-4 text-sm leading-6 text-gray-700">{data.description}</p>
          <Button className="mt-6" onClick={() => addToCart(data)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  )
}
