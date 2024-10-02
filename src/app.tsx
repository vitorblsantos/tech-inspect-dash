import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  PageHome,
  PageInspecoes,
  PageInspecoesDetails,
  PageInspecoesNew,
  PageNotifications,
  PageSignIn,
  PageSignUp
} from './pages/index.pages'
import { Styles } from './app.styles'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageHome />
  },
  {
    path: 'inspecoes/new',
    element: <PageInspecoesNew />
  },
  {
    path: 'inspecoes',
    element: <PageInspecoes />
  },
  {
    path: 'inspecoes/:id',
    element: <PageInspecoesDetails />
  },
  {
    path: 'notifications',
    element: <PageNotifications />
  },
  {
    path: 'signin',
    element: <PageSignIn />
  },
  {
    path: 'signup',
    element: <PageSignUp />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Styles />
    <RouterProvider {...{ router }} />
  </StrictMode>
)
