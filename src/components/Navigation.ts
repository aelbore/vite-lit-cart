import { html } from 'lit'
import { RouterLink } from './RouterLink'

import store from '../store'

export function Navigation() {
  return html `
    <header class="navigation">
      <nav>
        <ul>
          <li>${RouterLink('/', 'Products')}</li>
          <li>${RouterLink('/carts', `Carts (${store.cartQty})`)}</li>
        </ul>
      </nav>
    </header>`
}