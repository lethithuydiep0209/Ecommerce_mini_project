import { useCallback, useEffect, useState } from 'react'

type AsyncFunction<T> = () => Promise<T>

export function useFetch<T>(apiFn: AsyncFunction<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFn()
      setData(result)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred. Please retry.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [apiFn])

  useEffect(() => {
    if (immediate) {
      void execute()
    }
  }, [execute, immediate])

  return { data, loading, error, refetch: execute }
}
