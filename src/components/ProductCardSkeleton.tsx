export default function ProductCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="h-52 w-full animate-pulse bg-gray-200" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-9 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </article>
  )
}
