import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { RouterLitCart, router } from './router'
import { Navigation } from './components/Navigation'

import './styles.scss'

@customElement('lit-cart')
export class LitCartElement extends RouterLitCart {
  render() {
    return html `
      ${Navigation()}
      ${router.outlet(this)}`
  }
}