import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { AuthProvider } from './auth'
import useAuth from "./useAuth";
import { StrictMode } from 'react'

import './assets/bootstrap.min.css'
import './styles/index.css'

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (<p>Cargando</p>),
  defaultPreload: false,
  context: {
    auth: undefined,
  },
})

export function InnerApp() {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ auth }} />
}

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

