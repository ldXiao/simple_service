import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { OIDCProvider } from './auth'
import OidcCallback from './OidcCallback'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  { path: '/', element: <ProtectedRoute><App /></ProtectedRoute> },
  { path: '/login', element: <Login /> },              // optional entry
  { path: '/oidc/callback', element: <OidcCallback /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OIDCProvider>
      <RouterProvider router={router} />
    </OIDCProvider>
  </StrictMode>,
)
