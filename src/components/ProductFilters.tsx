type FilterState = {
  searchText: string
  category: string
  maxPrice: string
  sortBy: 'default' | 'price-asc' | 'price-desc'
}

type ProductFiltersProps = {
  filters: FilterState
  categories: string[]
  onChange: (next: FilterState) => void
}

export default function ProductFilters({
  filters,
  categories,
  onChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4">
      <input
        value={filters.searchText}
        onChange={(e) => onChange({ ...filters, searchText: e.target.value })}
        placeholder="Search products..."
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
      />
      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={0}
        value={filters.maxPrice}
        onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
        placeholder="Max price (USD)"
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
      />
      <select
        value={filters.sortBy}
        onChange={(e) =>
          onChange({
            ...filters,
            sortBy: e.target.value as FilterState['sortBy'],
          })
        }
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
      >
        <option value="default">Default sort</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  )
}
