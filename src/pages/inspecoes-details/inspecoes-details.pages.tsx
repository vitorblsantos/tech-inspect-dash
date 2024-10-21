import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'

import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'
import { EInspectionStatus } from '../../interfaces/index.interfaces'
import { ServiceBFF } from '../../services/index.services'

const InspectionDetails = () => {
  const [data, setData] = useState<any>({})

  const { id } = useParams()

    const handleData = async () => {
    const { data }: { data: any } = await ServiceBFF.get(`/inspecoes/${id}`)

    setData(data)
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes da Inspeção - {data?.id}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <List>
          <ListItem>
            <ListItemText primary="Edifício" secondary={data?.edificio} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Inspetor" secondary={data?.inspetor} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Criado em" secondary={data ? new Date(data?.created_at?._seconds * 1000).toLocaleString() : '--/--/----'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Atualizado em" secondary={data ? new Date(data?.updated_at?._seconds * 1000).toLocaleString() : '--/--/----'} />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Status
        </Typography>
        <Chip
          label={data?.status}
          color={
            data?.status === EInspectionStatus.DONE ? 'success' : data?.status === EInspectionStatus.PROCESSING ? 'primary' : 'default'
          }
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Descrição da Inspeção
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data?.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Imagens enviadas
        </Typography>

        {data?.images && !!data.images.length ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {data.images.map((el: any, index: number) => (
              <img
                key={index}
                src={el.original}
                alt={`Inspeção ${data?.id} - ${index}`}
                width="100px"
                height="100px"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Nenhuma imagem disponível.
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Analises
        </Typography>

        {data?.images && !!data.images.manipulated ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {data.images.manipulated.map((el: any, index: number) => (
              <img
                key={index}
                src={el.original}
                alt={`Inspeção ${data?.id} - ${index}`}
                width="100px"
                height="100px"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Nenhuma imagem disponível.
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export const PageInspecoesDetails: React.FC = () => {
  return (
    <Box>
      <ComponentHeader />
      <ComponentView>
        <InspectionDetails />
      </ComponentView>
      <ComponentFooter />
    </Box>
  )
}
