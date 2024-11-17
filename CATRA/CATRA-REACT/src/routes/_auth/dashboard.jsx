import { createFileRoute, Outlet } from '@tanstack/react-router'
import useAuth from '/src/useAuth'

import { Container } from 'react-bootstrap'
import DashboardSidebar from '/src/components/DashboardSidebar'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

const rutasClientes = [
  { name: 'Perfil', path: '/perfil' },
  { name: 'Subir Documentos', path: '/subir-documentos' },
  { name: 'Realizar Examen', path: '/realizar-examen' },
]

const rutasAdmin = [
  { name: 'Perfil', path: '/perfil' },
  { name: 'Administrar Clientes', path: '/clientes' },
  { name: 'Gestionar usuarios', path: '/usuarios' },
]

const rutasSecre = [
  { name: 'Perfil', path: '/perfil' },
  { name: 'Administrar Clientes', path: '/clientes' },
  { name: 'Gestionar usuarios', path: '/usuarios' },
]

function DashboardPage() {
  const auth = useAuth()

  return (
    <div style={{ display: 'flex' }}>
      <DashboardSidebar
        routes={
          auth.user?.role === 'cliente'
            ? rutasClientes
            : auth.user?.role === 'admin'
              ? rutasAdmin
              : rutasSecre
        }
      />
      <Container fluid style={{ marginLeft: '350px', padding: '15px' }}>
        <h1>Bienvenido al Dashboardd</h1>
        <Outlet />
      </Container>
    </div>
  )
}
