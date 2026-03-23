import ErrorMessage from '../components/ErrorMessage'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useFavorites } from '../context/FavoritesContext'
import { useFetch } from '../hooks/useFetch'
import { getProducts } from '../services/api.js'
import type { Product } from '../types'

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const { data, loading, error } = useFetch<Product[]>(getProducts)
  const products = data ?? []
  const favoriteProducts = products.filter((item) => favoriteIds.includes(item.id))

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">Favorites ❤️</h1>
        <p className="text-sm text-gray-500">You saved {favoriteProducts.length} products</p>
      </div>

      {loading && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      )}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && favoriteProducts.length === 0 && (
        <div className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
          No favorite products yet.
        </div>
      )}
      {!loading && !error && favoriteProducts.length > 0 && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
