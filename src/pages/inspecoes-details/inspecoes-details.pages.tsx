import React from 'react'
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
import { useParams } from 'react-router-dom'

const inspections = [
  {
    id: 'INS-001',
    createdAt: '2024-09-01',
    updatedAt: '2024-09-10',
    status: 'Concluído',
    building: 'Edifício Central',
    inspector: 'João Silva',
    description: 'Inspeção completa do edifício central. Relatório sem pendências.',
    images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  },
  {
    id: 'INS-002',
    createdAt: '2024-09-05',
    updatedAt: '2024-09-08',
    status: 'Em Progresso',
    building: 'Edifício Alfa',
    inspector: 'Maria Souza',
    description: 'Inspeção em andamento no Edifício Alfa.',
    images: ['img4.jpg', 'img5.jpg'],
  },
  {
    id: 'INS-003',
    createdAt: '2024-09-03',
    updatedAt: '2024-09-06',
    status: 'Pendente',
    building: 'Edifício Beta',
    inspector: 'Carlos Pereira',
    description: 'Inspeção não finalizada devido à falta de acesso a certas áreas.',
    images: [],
  },
]

const InspectionDetails: React.FC = () => {
  const { id } = useParams()
  const inspection = inspections.find((insp) => insp.id === id);

  if (!inspection) {
    return <Typography>Inspeção não encontrada.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes da Inspeção - {inspection.id}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <List>
          <ListItem>
            <ListItemText primary="Edifício" secondary={inspection.building} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Inspetor" secondary={inspection.inspector} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Criado em" secondary={inspection.createdAt} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Atualizado em" secondary={inspection.updatedAt} />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Status
        </Typography>
        <Chip
          label={inspection.status}
          color={
            inspection.status === 'Concluído' ? 'success' : inspection.status === 'Em Progresso' ? 'primary' : 'default'
          }
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Descrição da Inspeção
        </Typography>
        <Typography variant="body1" gutterBottom>
          {inspection.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Imagens
        </Typography>

        {inspection.images.length > 0 ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {inspection.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Inspeção ${inspection.id} - ${index}`}
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
