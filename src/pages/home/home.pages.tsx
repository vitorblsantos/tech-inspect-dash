import { useEffect, useState } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { red } from '@mui/material/colors'

import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'
import { IDashboard } from '../../interfaces/index.interfaces'
import { ServiceBFF } from '../../services/index.services'

export const PageHome = () => {
  const [data, setData] = useState<IDashboard>()
  const [inspecoes, setInspecoes] = useState<{ name: string; inspecoes: number }[]>([
    { name: 'Jan', inspecoes: 0 },
    { name: 'Fev', inspecoes: 0 },
    { name: 'Mar', inspecoes: 0 },
    { name: 'Abr', inspecoes: 0 },
    { name: 'Mai', inspecoes: 0 },
    { name: 'Jun', inspecoes: 0 },
    { name: 'Jul', inspecoes: 0 },
    { name: 'Ago', inspecoes: 0 },
    { name: 'Set', inspecoes: 0 },
    { name: 'Out', inspecoes: 0 }
  ])

  const handleData = async () => {
    const { data }: { data: IDashboard } = await ServiceBFF.get('/dashboard')

    setData(data)
    setInspecoes([
      { name: 'Jan', inspecoes: data.inspecoes.jan },
      { name: 'Fev', inspecoes: data.inspecoes.fev },
      { name: 'Mar', inspecoes: data.inspecoes.mar },
      { name: 'Abr', inspecoes: data.inspecoes.abr },
      { name: 'Mai', inspecoes: data.inspecoes.mai },
      { name: 'Jun', inspecoes: data.inspecoes.jun },
      { name: 'Jul', inspecoes: data.inspecoes.jul },
      { name: 'Ago', inspecoes: data.inspecoes.ago },
      { name: 'Set', inspecoes: data.inspecoes.set },
      { name: 'Out', inspecoes: data.inspecoes.out }
    ])
  }

  useEffect(() => {
    handleData()
  }, [])
  return (
    <>
      <ComponentHeader />
      <ComponentView>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="h6">Total de Inspeções</Typography>
              <Typography variant="h4">{data?.total}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="h6">Pendências</Typography>
              <Typography variant="h4">{data?.pendencias}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="h6">Última Inspeção</Typography>
              <Typography variant="h4">{data?.ultimaInspecao}</Typography>
            </Paper>
          </Grid>
        </Grid>
        {
          <Paper sx={{ p: 2 }}>
            <div style={{ height: '320px' }}>
              <ResponsiveContainer>
                <LineChart
                  data={inspecoes}
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
        }

      </ComponentView>
      <ComponentFooter />
    </>
  )
}
