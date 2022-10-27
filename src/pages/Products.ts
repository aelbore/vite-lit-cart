import { html } from 'lit'

import { Product as ProductItem } from '../pages/Product'
import { Product } from '../types'

import store from '@/store'

const addToCart = (product: Product) => {
  return () => store.addToCart(product)
}

export function Products() {
  return html `
    <section class="products">
      <ul>
        ${store.products.value.map(product => {
          return html `<li>${ProductItem({ product, addToCart })}</li>`
        })}
      </ul>
    </section>`
} 