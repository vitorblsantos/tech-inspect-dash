import { useState } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'

import { grey, red } from '@mui/material/colors'

export const ComponentFooter = () => {
  const [value, setValue] = useState()

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: red[500],
        bottom: 0,
        boxShadow: `${red[500]} 0 0 12px`,
        display: {
          xs: 'none',
          sm: 'flex'
        },
        position: 'fixed',
        width: '100%'
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
        sx={{
          background: grey[900],
          width: '100%'
        }}
      >
        <BottomNavigationAction component={Link}
          to="/"
          sx={{ color: grey[500] }}
          label="Dashboard"
          icon={<HomeIcon />}
          value="/"/>
        <BottomNavigationAction
          component={Link}
          to="/inspecoes"
          sx={{ color: grey[500] }}
          label="Minhas Inspeções"
          icon={<SearchIcon />}
          value="/inspecoes"
        />
      </BottomNavigation>
    </Box>
  )
}
