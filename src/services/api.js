const API_BASE_URL = 'https://fakestoreapi.com'
let cachedProducts = null

const TARGET_PRODUCT_COUNT = 40

function expandProducts(baseProducts) {
  if (baseProducts.length >= TARGET_PRODUCT_COUNT) return baseProducts

  const expanded = [...baseProducts]
  let cycle = 1

  while (expanded.length < TARGET_PRODUCT_COUNT) {
    for (const product of baseProducts) {
      if (expanded.length >= TARGET_PRODUCT_COUNT) break
      const nextId = baseProducts.length * cycle + product.id
      expanded.push({
        ...product,
        id: nextId,
        title: `${product.title} - Edition ${cycle + 1}`,
        price: Number((product.price * (1 + cycle * 0.04)).toFixed(2)),
      })
    }
    cycle += 1
  }

  return expanded
}

async function loadProducts() {
  if (cachedProducts) return cachedProducts
  const response = await fetch(`${API_BASE_URL}/products`)
  if (!response.ok) {
    throw new Error('Unable to load product list. Please try again.')
  }

  const products = await response.json()
  cachedProducts = expandProducts(products)
  return cachedProducts
}

export async function getProducts() {
  return loadProducts()
}

export async function getProductById(id) {
  const products = await loadProducts()
  const product = products.find((item) => item.id === id)
  if (!product) {
    throw new Error('Unable to load product detail. Please try again.')
  }
  return product
}
