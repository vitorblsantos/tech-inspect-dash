import React, { useState } from 'react'
import { Box, Button, FormHelperText, Grid, IconButton, Input, MenuItem, Paper, Snackbar, SnackbarCloseReason, TextField, Typography } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close';

import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'
import { EInspectionStatus, IInspection } from '../../interfaces/index.interfaces'
import { ServiceBFF } from '../../services/index.services'

const edificios = [
  { label: 'Edificio 1', value: 'edificio-1' },
  { label: 'Edificio 2', value: 'edificio-2' },
  { label: 'Edificio 3', value: 'edificio-3' }
]

const InspectionForm = () => {
  const [formData, setFormData] = useState<Omit<IInspection, 'id' | 'created_at' | 'updated_at'>>({
    description: '',
    edificio: '',
    images: [],
    inspected_at: new Date(),
    inspetor: 'Kevin Ma Mahr',
    status: EInspectionStatus['PENDING'],
  })
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await ServiceBFF.post('/inspecoes', {
      payload: formData
    })

    setOpen(true)
  }

  const handleImageUpload = async (e: any) => {
    const files: File[] = Array.from(e.target.files)

    if (files.length > 4) {
      setError('Você pode fazer upload de no máximo quatro imagens.')
      return
    }

    const base64Images = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
        })
      })
    )

    setFormData({
      ...formData,
      images: base64Images
    })

    setError('')
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Registrar Nova Inspeção
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Edificio"
              name="edificio"
              value={formData.edificio}
              onChange={handleChange}
              required
            >
              {edificios.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data da Inspeção"
              name="inspected_at"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              value={formData.inspected_at}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="upload-images"
              type="file"
              name="images"
              onChange={handleImageUpload}
              inputProps={{ accept: 'image/*', multiple: true }}
            />
            <FormHelperText>Upload de no máximo 4 imagens.</FormHelperText>
            {error && <FormHelperText error>{error}</FormHelperText>}
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="caption" fontWeight={700}>
              Imagens da inspeção:
            </Typography>
            {formData.images.length > 0 && (
              <Box sx={{ display: 'flex', mt: 2, flexFlow: 'column nowrap' }}>
                {formData.images.map((file, index) => (
                  <List key={index}>
                    <ListItem>{file.name}</ListItem>
                  </List>
                ))}
              </Box>
            )}
          </Grid> */}
          <Grid item xs={12}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Button sx={{
                background: red[500],
                color: grey[900],
                fontWeight: 600
              }} title="Registrar Inspeção" type="submit" variant="contained">
                Registrar Inspeção
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        sx={{ marginBottom: '40px' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Registro salvo com sucesso!"
        action={action}
      />
    </Paper>
  )
}

export const PageInspecoesNew: React.FC = () => {
  return (
    <>
      <ComponentHeader />
      <ComponentView>
        <InspectionForm />
      </ComponentView>
      <ComponentFooter />
    </>
  )
}
