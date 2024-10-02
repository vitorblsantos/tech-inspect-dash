import { createGlobalStyle } from 'styled-components'
import { Reset } from './reset.styles'

export const Styles = createGlobalStyle`
  ${Reset}

  :root {
    font-size: 16px;
    font-family: 'Roboto', 'Open Sans', sans-serif;
  }
`
