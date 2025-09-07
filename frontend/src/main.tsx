import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { OIDCProvider } from './auth'
import OidcCallback from './OidcCallback'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/oidc/callback', element: <OidcCallback /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OIDCProvider>
      <RouterProvider router={router} />
    </OIDCProvider>
  </StrictMode>,
)
