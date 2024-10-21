import React, { useEffect, useState } from 'react'
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
import { ServiceBFF } from '../../services/index.services'
import { EInspectionStatus, IInspection } from '../../interfaces/index.interfaces'

const FloatingActionButton = () => {
  const navigate = useNavigate()

  const redirect = (page: string) => {
    navigate(page)
  }

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
        ':hover': {
          background: red[900],
          color: grey[100]
        }
      }}
    >
      <Add />
    </Fab>
  )
}

const InspectionManagement: React.FC = () => {
  const [inspections, setInspections] = useState<
    | IInspection[]
    | null
  >(null)

  const navigate = useNavigate()

  const redirect = (page: string) => {
    navigate(page)
  }

  const handleData = async () => {
    const { data } = await ServiceBFF.get('/inspecoes')
    setInspections(data)
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Minhas Inspeções
      </Typography>
      <Paper>
        <List sx={{ padding: 0 }}>
          {inspections &&
            inspections.map((inspection, index) => (
              <React.Fragment key={inspection.id}>
                <ListItem
                  sx={{ alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => redirect(`/inspecoes/${inspection.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Assignment />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={inspection.edificio}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          Identificador: {inspection.id}
                        </Typography>
                        {' — '}
                        Criado em: {new Date(inspection.created_at._seconds * 1000).toLocaleDateString()}
                        {' — '}
                        Atualizado em: {new Date(inspection.updated_at._seconds * 1000).toLocaleDateString()}
                      </>
                    }
                  />
                  <Chip
                    label={inspection.status}
                    color={
                      inspection.status === EInspectionStatus.DONE
                        ? 'success'
                        : inspection.status === EInspectionStatus.PROCESSING
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
