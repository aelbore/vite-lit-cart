import { html, nothing } from 'lit'

import { Cart as CartItem } from './Cart'
import { Cart } from '../types'

import store from '../store'

const removeFromCart = (cart: Cart) => {
  return () => store.dispatch('removeFromCart', cart)
}

export function Carts() {
  return html `
    <section class="carts">
      ${store.carts.value.length <= 0 
        ? html `<p>No Item in the Cart!</p>`
        : nothing}
      <ul>
        ${store.carts.value.map(cart => {
          return html `<li>${CartItem({ cart, removeFromCart })}</li>`
        })}
      </ul>
    </section>`
}