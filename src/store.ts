import { signal, Signal } from 'usignal'
import { createStore } from 'signal-store'

import { Cart, Product } from './types'

export interface State {
  products: Signal<Product[]>
  carts: Signal<Cart[]>
}

export default createStore({
  state: {
    products: signal([
      { id: 'p1', title: 'Gaming Mouse', price: 29.99 },
      { id: 'p2', title: 'Harry Potter 3', price: 9.99 },
      { id: 'p3', title: 'Used plastic bottle', price: 0.99 },
      { id: 'p4', title: 'Half-dried plant', price: 2.99 }
    ]),
    carts: signal([])
  },
  getters: {
    products(state: State) {
      return state.products.value
    },
    carts(state: State) {
      return state.carts.value
    },
    cartQty(state: State) {
      return state.carts.value.reduce((p, c) => {
        return p + c.quantity
      }, 0)
    }
  },
  actions: {
    addToCart({ state }, product: Product) {
      const index = state.carts.value.findIndex(cart => cart.id === product.id)
      const states = [ ...state.carts.value ]
      if (index !== -1) {
        states[index].quantity++
      } else {
        states.push({ ...product, quantity: 1 })
      }
      state.carts.value = [ ...states ]
    },
    removeFromCart({ state }, cart: Cart) {
      const states = [ ...state.carts.value ]
      const index = state.carts.value.findIndex(c => c.id === cart.id)
      if (index !== -1) {
        const item = states[index]
        if (item.quantity === 0) {
          states.splice(index, 1)
        } else {
          states[index].quantity--
        }
      }
      state.carts.value = [ ...states ]
    }
  }
})