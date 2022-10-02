import { signal, computed } from 'usignal'
import { AddToCart, Cart, Product, RemoveItem, ShopStore } from './types'

const products = signal<Product[]>([
  { id: 'p1', title: 'Gaming Mouse', price: 29.99 },
  { id: 'p2', title: 'Harry Potter 3', price: 9.99 },
  { id: 'p3', title: 'Used plastic bottle', price: 0.99 },
  { id: 'p4', title: 'Half-dried plant', price: 2.99 }
])
const carts = signal<Cart[]>([])

const actions = {
  addToCart(product: Product) {
    const index = carts.value.findIndex(cart => cart.id === product.id)
    const states = [ ...carts.value ]
    if (index !== -1) {
      states[index].quantity++
    } else {
      states.push({ ...product, quantity: 1 })
    }
    carts.value = [ ...states ]
  },
  removeFromCart(cart: Cart) {
    const states = [ ...carts.value ]
    const index = carts.value.findIndex(c => c.id === cart.id)
    if (index !== -1) {
      const item = states[index]
      if (item.quantity === 0) {
        states.splice(index, 1)
      } else {
        states[index].quantity--
      }
    }
    carts.value = [ ...states ]
  }
} as AddToCart & RemoveItem

const store = {
  carts: computed(() => carts.value),
  products: computed(() => products.value),
  cartQty: computed(() => {
    return carts.value.reduce((p, c) => {
      return p + c.quantity
    }, 0)
  }),
  dispatch<T>(type?: string, payload?: T) {
    actions[type]?.(payload)
  }
} as ShopStore

export default store