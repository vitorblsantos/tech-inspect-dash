import { Box, Button, FormHelperText, Grid, Input, List, ListItem, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'
import React, { useState } from 'react'
import { grey, red } from '@mui/material/colors'

const edificios = [
  { label: 'Edificio 1', value: 'edificio-1' },
  { label: 'Edificio 2', value: 'edificio-2' },
  { label: 'Edificio 3', value: 'edificio-3' }
]

const InspectionForm = () => {
  const [formData, setFormData] = useState({
    inspetor: '',
    data: '',
    descricao: '',
    imagens: []
  })

  const [error, setError] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Dados da inspeção:', formData)
  }

  const handleImageUpload = (e: any) => {
    const files: any = Array.from(e.target.files)
    if (files.length > 4) {
      setError('Você pode fazer upload de no máximo quatro imagens.')
    } else {
      setFormData({
        ...formData,
        imagens: files
      })
      setError('')
    }
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
              name="inspetor"
              value={formData.inspetor}
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
              name="data"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              value={formData.data}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              name="descricao"
              multiline
              rows={4}
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              accept="image/*"
              id="upload-images"
              multiple
              type="file"
              name="imagens"
              onChange={handleImageUpload}
              inputProps={{ multiple: true }}
            />
            <FormHelperText>Upload de no máximo 4 imagens.</FormHelperText>
            {error && <FormHelperText error>{error}</FormHelperText>}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" fontWeight={700}>
              Imagens da inspeção:
            </Typography>
            {formData.imagens.length > 0 && (
              <Box sx={{ display: 'flex', mt: 2, flexFlow: 'column nowrap' }}>
                {formData.imagens.map((file, index) => (
                  <List key={index}>
                    <ListItem>{file['name']}</ListItem>
                  </List>
                ))}
              </Box>
            )}
          </Grid>
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
