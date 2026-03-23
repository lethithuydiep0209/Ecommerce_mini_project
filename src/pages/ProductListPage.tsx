import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import ProductFilters from '../components/ProductFilters'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import { getProducts } from '../services/api.js'
import type { Product } from '../types'
import Button from '../components/Button'

type FilterState = {
  searchText: string
  category: string
  maxPrice: string
  sortBy: 'default' | 'price-asc' | 'price-desc'
}

const ITEMS_PER_PAGE = 8

export default function ProductListPage() {
  const [searchParams] = useSearchParams()
  const initialKeyword = searchParams.get('q') ?? ''
  const initialCategory = searchParams.get('category') ?? ''
  const [filters, setFilters] = useState<FilterState>({
    searchText: initialKeyword,
    category: initialCategory,
    maxPrice: '',
    sortBy: 'default',
  })
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(filters.searchText, 350)
  const { data, loading, error } = useFetch<Product[]>(getProducts)
  const products = data ?? []

  const categories = useMemo(
    () => Array.from(new Set(products.map((item) => item.category))),
    [products],
  )

  const processedProducts = useMemo(() => {
    const filtered = products.filter((item) => {
      const textMatch = item.title
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase())
      const categoryMatch = filters.category ? item.category === filters.category : true
      const maxPrice = Number(filters.maxPrice)
      const priceMatch = filters.maxPrice ? item.price <= maxPrice : true
      return textMatch && categoryMatch && priceMatch
    })

    if (filters.sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price)
    }
    if (filters.sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price)
    }
    return filtered
  }, [products, debouncedSearch, filters.category, filters.maxPrice, filters.sortBy])

  const totalPages = Math.max(1, Math.ceil(processedProducts.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleFilterChange = (next: FilterState) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">All Products</h1>
        <p className="text-sm text-gray-500">
          Found {processedProducts.length} matching products
        </p>
      </div>

      <ProductFilters
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
      />

      {loading && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage}/{totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
