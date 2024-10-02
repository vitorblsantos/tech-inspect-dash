import React from 'react'
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import { Add, Assignment, Visibility } from '@mui/icons-material'

import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'
import { useNavigate } from 'react-router-dom'
import { grey, red } from '@mui/material/colors'

const inspections = [
  {
    id: 'INS-001',
    createdAt: '2024-09-01',
    updatedAt: '2024-09-10',
    status: 'Concluído',
    building: 'Edifício Central'
  },
  {
    id: 'INS-002',
    createdAt: '2024-09-05',
    updatedAt: '2024-09-08',
    status: 'Em Progresso',
    building: 'Edifício Alfa'
  },
  {
    id: 'INS-003',
    createdAt: '2024-09-03',
    updatedAt: '2024-09-06',
    status: 'Pendente',
    building: 'Edifício Beta'
  }
]

const  FloatingActionButton: React.FC = () => {
  const navigate = useNavigate()

  const redirect = (page: string) => {
    navigate(page)
  };

  return (
    <Fab
      aria-label="add"
      onClick={() => redirect('/inspecoes/new')}
      sx={{
        background: red[500],
        color: grey[300],
        position: 'fixed',
        bottom: 80,
        right: 24,
        transition: 'all .3s ease-in-out',
        ":hover": {
          background: red[900],
          color: grey[100],
        }
      }}
    >
      <Add />
    </Fab>
  );
}

const InspectionManagement: React.FC = () => {
  const navigate = useNavigate()

  const redirect = (page: string) => {
    navigate(page)
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Minhas Inspeções
      </Typography>
      <Paper>
        <List sx={{ padding: 0 }}>
          {inspections.map((inspection, index) => (
            <React.Fragment key={inspection.id}>
              <ListItem
                button
                sx={{ alignItems: 'center', cursor: 'pointer' }}
                onClick={() => redirect(`/inspecoes/${inspection.id}`)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Assignment />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={inspection.building}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        Identificador: {inspection.id}
                      </Typography>
                      {' — '}
                      Criado em: {inspection.createdAt}
                      {' — '}
                      Atualizado em: {inspection.updatedAt}
                    </>
                  }
                />
                <Chip
                  label={inspection.status}
                  color={
                    inspection.status === 'Concluído'
                      ? 'success'
                      : inspection.status === 'Em Progresso'
                        ? 'primary'
                        : 'default'
                  }
                  sx={{ mr: 2 }}
                />
                <Visibility />
              </ListItem>
              {index < inspections.length - 1 && <Divider variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <FloatingActionButton />
    </Box>
  )
}

export const PageInspecoes: React.FC = () => {
  return (
    <>
      <ComponentHeader />
      <ComponentView>
        <InspectionManagement />
      </ComponentView>
      <ComponentFooter />
    </>
  )
}
