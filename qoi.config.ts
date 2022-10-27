import { defineConfig } from 'qoi-cli'
import { Lit } from 'rollup-plugin-lit-element'

export default defineConfig({
  external: [ 'lit/decorators.js', 'lit' ],
  swc: {
    jsc: { target: 'es2022' }
  },
  plugins: [ Lit() as [] ]
})