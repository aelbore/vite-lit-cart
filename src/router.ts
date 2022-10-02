import { LitElement } from 'lit'
import { createRouter, createSignalElement } from './libs'

import { Carts } from './pages/Carts'
import { Products } from './pages/Products'

export const router = createRouter({
  routes: [
    { path: '/', render: Products },
    { path: '/carts', render: Carts }
  ]
})

export const RouterLitCart = createSignalElement(LitElement)