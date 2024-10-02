import React from 'react'
import { Container } from '@mui/material'

export const ComponentView = (props: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{
        bottom: 64,
        overflowY: 'auto',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 76,
        zIndex: '-1',
        '::-webkit-scrollbar': {
          width: '0.4em'
        },
        '::-webkit-scrollbar-track': {
          borderRadius: '12px',
          boxShadow: 'inset 0 0 6px #212121',
          webkitBoxShadow: 'inset 0 0 4px #212121'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#f44336',
          borderRadius: '12px',
          outline: '1px solid #212121'
        }
      }}
    >
      {props.children}
    </Container>
  )
}
