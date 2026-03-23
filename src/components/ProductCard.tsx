import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'
import Button from './Button'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const favored = isFavorite(product.id)

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition duration-200 hover:scale-[1.015] hover:shadow-md">
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute right-3 top-3 z-[1] rounded-full bg-white/95 px-2 py-1 text-sm shadow"
        aria-label="Toggle favorite"
      >
        {favored ? '❤️' : '🤍'}
      </button>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="aspect-square w-full object-contain bg-white p-4"
        />
      </Link>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-medium leading-5 overflow-hidden"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {product.title}
        </Link>
        <p className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</p>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        <Button
          onClick={() => {
            addToCart(product)
            showToast('Added to cart')
          }}
          className="mt-auto w-full"
        >
          Add to Cart
        </Button>
      </div>
    </article>
  )
}
