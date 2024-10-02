import { css } from 'styled-components'

export const Reset = css`
  a, button, div, input  {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    outline: none;
    user-select: none;
  }

  button, div {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    overflow: hidden;
  }

  img {
    height: auto;
    width: 100%;
  }
`
