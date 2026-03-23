import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

export default function CartPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    totalPrice,
    totalQuantity,
    clearCart,
  } =
    useCart()

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="mt-3 text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-5 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => removeFromCart(item.id)}
                    className="h-9 w-9 px-0"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="inline-flex h-9 min-w-9 items-center justify-center rounded border border-gray-200 px-3 text-center">
                    {item.quantity}
                  </span>
                  <Button onClick={() => addToCart(item)} className="h-9 w-9 px-0">
                    +
                  </Button>
                  <Button variant="danger" onClick={() => deleteFromCart(item.id)}>
                    Remove
                  </Button>
                  <strong className="ml-2">{formatPrice(item.price * item.quantity)}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-lg bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
            <p className="font-medium">
              Total {totalQuantity} items - {formatPrice(totalPrice)}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="danger" onClick={clearCart}>
                Clear cart
              </Button>
              <Link to="/checkout">
                <Button>Checkout</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
