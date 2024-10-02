import { browserslistToTargets } from 'lightningcss'

import { defineConfig } from 'vite'

import browserslist from 'browserslist'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss'
  },
  css: {
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    },
    transformer: 'lightningcss'
  },
  plugins: [react()]
})
