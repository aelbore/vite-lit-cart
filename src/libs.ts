import { nothing, type ReactiveElement, type TemplateResult } from 'lit'
import Navigo, { type Match, type NavigateOptions } from 'navigo'

import { signal, effect, computed, Signal } from 'usignal'

export interface RouteParams<T = {}> extends Omit<Match, 'data'> {
  data?: T
}

export type Render<T = {}> = (props?: T) => TemplateResult | typeof nothing | symbol

export interface RenderOptions {
  render<T>(props?: T): TemplateResult | typeof nothing | symbol
}

export interface Route extends RenderOptions {
  path: string
}

export interface RouteConfig {
  root?: string
  routes: Route[]
}

export interface Router {
  outlet(element?: HTMLElement):  TemplateResult | typeof nothing
  navigate(to: string, options?: NavigateOptions): void
  current?: Signal<Match>
}

export interface RouterOutlet {
  router?: Router
}

export function createRouter(config: RouteConfig) {
  const template = signal<Render>(null)
  const current = signal<Match>(null)

  const router = new Navigo(config.root || '/')
  config.routes.forEach(route => {
    router.on(route.path, (match: Match) => {    
      current.value = match
      template.value = route.render
    })
  })
  router.resolve()

  const outlet = (element?: HTMLElement) => template.value(element)

  return { 
    outlet, 
    navigate: router.navigate, 
    current: computed(() => current.value)
  } as Router
}

/* eslint-disable */
export type ReactiveElementConstructor = new (...args: any[]) => ReactiveElement

export function createSignalElement<T extends ReactiveElementConstructor>(Base: T) {
  return class SignalElement extends Base {
    #disposeEffect?: () => void
    
    performUpdate() {
      if (!this.isUpdatePending) {
        return
      }
      this.#disposeEffect?.()
      this.#disposeEffect = effect(() => {
        this.isUpdatePending = true
        super.performUpdate()
      })
    }
  }
}

export interface EventCallback<T> {
  (payload?: T): void
}

export type EventSubscribe = () => void

export interface IEvent {
  subscribe: <T>(type: string, listener: EventCallback<T>) => EventSubscribe
  dispatch: <T>(type: string, payload?: T) => void
  disposeAll: () => void
}

export function createEvent() {
  const types = {}, hOP = types.hasOwnProperty

  const subscribe = <T>(type: string, listener: EventCallback<T>) => {
    if (!hOP.call(type, type)) types[type] = []

    const index = types[type].push(listener) - 1

    return () => delete types[type][index]
  }

  const dispatch = <T>(type: string, payload?: T) => {
    if(!hOP.call(types, type)) return
    types[type].forEach(item => {
      item(payload != undefined ? payload: {})
    })
  }

  const disposeAll = () => Object.keys(types).forEach(key => delete types[key])

  return { subscribe, dispatch, disposeAll } as IEvent
}