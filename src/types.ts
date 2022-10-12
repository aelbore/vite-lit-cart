import type { Signal } from 'usignal'

export interface Product {
  id?: string
  title?: string
  price?: number
}

export interface Cart extends Product {
  quantity?: number
}

export interface EventCart {
  (event?: Event): void
}

export interface AddToCart {
  addToCart: (product: Product) => EventCart
}

export interface RemoveItem {
  removeFromCart(cart: Cart): EventCart
}

export interface ProductsProps extends AddToCart {
  products?: Product[]
}

export interface ProductProps extends AddToCart {
  product?: Product
}

export interface CartProps extends RemoveItem {
  cart?: Cart
}

export interface CartsProps extends RemoveItem {
  carts?: Cart[]
}