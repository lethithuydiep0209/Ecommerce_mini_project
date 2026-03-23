import { useEffect, useMemo, useState } from 'react'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { Link } from 'react-router-dom'
import HomeBanner from '../components/HomeBanner'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/useFetch'
import { getProducts } from '../services/api.js'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'

export default function HomePage() {
  const { data, loading, error } = useFetch<Product[]>(getProducts)
  const products = data ?? []
  const categories = Array.from(new Set(products.map((item) => item.category)))
  const [flashCountdown, setFlashCountdown] = useState(2 * 60 * 60 + 30 * 60)
  const [visibleMoreCount, setVisibleMoreCount] = useState(10)
  const featuredProducts = products.slice(0, 10)
  const flashSaleProducts = [...products]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 10)
  const allMoreProducts = products.slice(10, 40)
  const moreProducts = allMoreProducts.slice(0, visibleMoreCount)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFlashCountdown((prev) => (prev <= 1 ? 2 * 60 * 60 + 30 * 60 : prev - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const countdownLabel = useMemo(() => {
    const hours = String(Math.floor(flashCountdown / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((flashCountdown % 3600) / 60)).padStart(2, '0')
    const seconds = String(flashCountdown % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }, [flashCountdown])

  return (
    <section>
      <HomeBanner />

      <section className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="min-w-fit shrink-0 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-center text-sm capitalize text-gray-700 hover:border-orange-300 hover:text-orange-600"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-sm font-medium text-orange-600">
            View all →
          </Link>
        </div>
        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Flash Sale</h2>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              Ends in
            </span>
            <span className="rounded-md bg-gray-900 px-3 py-1 text-xs font-bold text-white">
              {countdownLabel}
            </span>
          </div>
        </div>
        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={`flash-skeleton-${index}`} />
            ))}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="relative">
                <span className="absolute left-3 top-3 z-[1] rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                  -15%
                </span>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#ee4d2d] to-orange-400 p-6 text-white">
        <p className="text-xs uppercase tracking-wider text-orange-100">Promo Banner</p>
        <h3 className="mt-2 text-2xl font-bold">Free shipping for orders over {formatPrice(20)}</h3>
        <p className="mt-2 text-sm text-orange-50">
          Enjoy extra discounts and free shipping when you shop today.
        </p>
        <Link
          to="/products"
          className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#ee4d2d]"
        >
          Shop deals
        </Link>
      </section>

      <section className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">More Products</h2>
          <Link to="/products" className="text-sm font-medium text-orange-600">
            Browse all →
          </Link>
        </div>
        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, index) => (
              <ProductCardSkeleton key={`more-skeleton-${index}`} />
            ))}
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {moreProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {visibleMoreCount < allMoreProducts.length && (
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setVisibleMoreCount((prev) => prev + 10)}
                  className="rounded-lg bg-[#ee4d2d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {error && (
        <p className="rounded-xl bg-red-50 p-6 text-sm text-red-600">Unable to load data.</p>
      )}
    </section>
  )
}
