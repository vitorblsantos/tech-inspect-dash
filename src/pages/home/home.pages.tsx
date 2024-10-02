import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { red } from '@mui/material/colors'

import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'

const data = [
  { name: 'Jan', inspecoes: 10 },
  { name: 'Fev', inspecoes: 0 },
  { name: 'Mar', inspecoes: 50 },
  { name: 'Abr', inspecoes: 20 },
  { name: 'Mai', inspecoes: 44 },
  { name: 'Jun', inspecoes: 33 },
  { name: 'Jul', inspecoes: 33 },
  { name: 'Ago', inspecoes: 40 },
  { name: 'Set', inspecoes: 60 },
  { name: 'Out', inspecoes: 80 }
]

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6">Total de Inspeções</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6">Pendências</Typography>
            <Typography variant="h4">15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6">Última Inspeção</Typography>
            <Typography variant="h4">25/09/2024</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const SmallLineChart = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ height: '320px' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="inspecoes" stroke={red[500]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  )
}

export const PageHome: React.FC = () => {
  return (
    <>
      <ComponentHeader />
      <ComponentView>
        <Dashboard />
        <SmallLineChart />
      </ComponentView>
      <ComponentFooter />
    </>
  )
}
