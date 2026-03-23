import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type FavoritesContextValue = {
  favoriteIds: number[]
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

const FAVORITES_STORAGE_KEY = 'mini-shoppe-favorites'
const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const value = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!value) return []
    try {
      return JSON.parse(value) as number[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const toggleFavorite = (productId: number) => {
    setFavoriteIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const isFavorite = useMemo(
    () => (productId: number) => favoriteIds.includes(productId),
    [favoriteIds],
  )

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
