import { html } from 'lit'
import { router } from '../router'

const navigate = (url: string) => 
  (event: Event) => {
    event.preventDefault()
    router.navigate(url);
  }

export function RouterLink(url: string, label: string) {
  return html `<a @click=${navigate(url)}>${label}</a>`
}