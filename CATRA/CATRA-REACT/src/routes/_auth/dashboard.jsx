import { createFileRoute, Outlet } from '@tanstack/react-router'
import useAuth from '../../useAuth'

import { Container } from 'react-bootstrap';
import DashboardSidebar from '../../components/DashboardSidebar';

export const Route = createFileRoute('/_auth/dashboard')({
    component: DashboardPage, 
})

const rutasClientes = [
  { name: 'Perfil', path: '/perfil' },
  { name: 'Subir Documentos', path: '/subir-documentos' },
];

const rutasAdmin = [
  { name: 'Perfil', path: '/perfil' },
  { name: 'Administrar Clientes', path: '/administrar-clientes' },
  { name: 'Gestionar usuarios', path: '/usuarios' },
];

const rutasSecre = [
  { name: 'Perfil', path: '/perfil' },
  { name: 'Administrar Clientes', path: '/administrar-clientes' },
];

function App() {

  const auth = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      <DashboardSidebar routes={
        auth.user.role === "cliente" ? rutasClientes :
        auth.user.role === "admin" ? rutasAdmin : rutasSecre
        } />
      <Container fluid style={{ marginLeft: '200px', padding: '15px' }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;


function DashboardPage() {
    const auth = useAuth()

    if(auth.isAdmin) {
        return <AdminLayout />
    } else {
        return <ClientLayout />
    }
}