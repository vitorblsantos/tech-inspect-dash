import React, { useEffect, useState } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { red } from '@mui/material/colors'

import { ComponentFooter, ComponentHeader, ComponentView } from '../../components/index.components'
import { ServiceBFF } from '../../services/index.services'

const Dashboard = (props: any) => {
  const [data, setData] = useState({
    total: 0,
    pendencias: 0,
    ultimaInspecao: '--/--/----',
    inspecoes: {
      jan: 10,
      fev: 0,
      mar: 0,
      abr: 0,
      mai: 0,
      jun: 0,
      jul: 0,
      ago: 0,
      set: 0,
      out: 0,
      nov: 0,
      dez: 0
    }
  })

  const handleData = () => {}

  useEffect(() => handleData(), [])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6">Total de Inspeções</Typography>
            <Typography variant="h4">{data.total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6">Pendências</Typography>
            <Typography variant="h4">{data.pendencias}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6">Última Inspeção</Typography>
            <Typography variant="h4">{data.ultimaInspecao}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const SmallLineChart = (props: any) => {
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

  const handleInspecoes = () => {
    if (!props.data || !props.data.inspecoes) return

    setInspecoes([
      { name: 'Jan', inspecoes: props.data.inspecoes.jan },
      { name: 'Fev', inspecoes: props.data.inspecoes.fev },
      { name: 'Mar', inspecoes: props.data.inspecoes.mar },
      { name: 'Abr', inspecoes: props.data.inspecoes.abr },
      { name: 'Mai', inspecoes: props.data.inspecoes.mai },
      { name: 'Jun', inspecoes: props.data.inspecoes.jun },
      { name: 'Jul', inspecoes: props.data.inspecoes.jul },
      { name: 'Ago', inspecoes: props.data.inspecoes.ago },
      { name: 'Set', inspecoes: props.data.inspecoes.set },
      { name: 'Out', inspecoes: props.data.inspecoes.out }
    ])
  }

  useEffect(() => handleInspecoes(), [props.data])

  return (
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
  )
}

export const PageHome: React.FC = () => {
  const [data, setData] = useState<[]>()

  const handleData = async () => {
    const { data } = await ServiceBFF.get('/')
    setData(data)
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <>
      <ComponentHeader />
      <ComponentView>
        <Dashboard {...{ data }} />
        <SmallLineChart {...{ data }} />
      </ComponentView>
      <ComponentFooter />
    </>
  )
}
