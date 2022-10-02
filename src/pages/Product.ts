import { html } from 'lit'
import { ProductProps } from '../types'

export function Product({ product, addToCart }: ProductProps) {
  return html `
    <section class="product">
      <span>
        <strong>${product.title}</strong> - ${product.price}
      </span>
      <span>
        <button @click=${addToCart(product)}>
          Add to Cart
        </button>
      </span>
    </section>`
}