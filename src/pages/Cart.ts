import type { CartProps } from '../types'

import { html } from 'lit'

export function Cart({ cart, removeFromCart }: CartProps) {
  return html `
    <section class="product">
      <span>
        <strong>${cart.title}</strong> - (${cart.price}) (${cart.quantity})
      </span>
      <span>
        <button @click=${removeFromCart(cart)}>
          Remove from Cart
        </button>
      </span>
    </section>`
}