import { Link } from "@tanstack/react-router"
import { Nav } from "react-bootstrap"
import PropTypes from 'prop-types';
import useAuth from 'src/useAuth'
import './style.css'

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

function getRoutesByRole(role) {
  switch (role) {
    case 'cliente':
      return rutasClientes;
    case 'admin':
      return rutasAdmin;
    case 'secretaria':
      return rutasSecre;
    default:
      return [];
  }
}

function Sidebar({ openSidebarToggle, OpenSidebar }) {

  const auth = useAuth();

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          CATRA
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        {getRoutesByRole(auth.user?.role).map((route) => (
          <Nav.Item key={route.path}>
            <Link to={route.path} className="nav-link">
              {route.name}
            </Link>
          </Nav.Item>
        ))}
      </ul>
    </aside>
  )
}

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar