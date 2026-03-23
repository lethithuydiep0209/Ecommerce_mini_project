import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const activeClass = 'text-orange-100'

export default function Header() {
  const { totalQuantity } = useCart()
  const { user, logout } = useAuth()
  const [keyword, setKeyword] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const q = keyword.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4">
        <Link to="/" className="text-2xl font-bold">
          Mini Shoppe
        </Link>
        <form onSubmit={onSubmit} className="order-3 w-full md:order-2 md:flex-1">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-md border border-white/70 bg-white px-4 py-2 text-sm text-gray-800 outline-none ring-0 focus:border-white focus:ring-2 focus:ring-orange-200"
          />
        </form>
        <nav className="flex items-center gap-4 text-sm font-medium md:order-3">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : '')}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? activeClass : '')}
          >
            Products
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? activeClass : '')}
          >
            Favorites
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? activeClass : '')}
          >
            Contact
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? activeClass : '')}>
            🛒 ({totalQuantity})
          </NavLink>
          {!user ? (
            <Link to="/login" className="rounded border border-white/40 px-2 py-1 text-xs hover:bg-white/10">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="rounded border border-white/40 px-2 py-1 text-xs hover:bg-white/10"
              >
                {user.name}
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-md bg-white text-sm text-gray-700 shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      logout()
                      setShowMenu(false)
                      navigate('/')
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
