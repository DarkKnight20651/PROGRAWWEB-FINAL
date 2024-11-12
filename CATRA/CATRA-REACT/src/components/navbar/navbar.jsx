import { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '/src/assets/CATRAF.png'
import { Link } from '@tanstack/react-router'
import useAuth from '../../useAuth'

const Menu = () => {
  return (
    <>
      <p><Link>Inicio</Link></p>
      <p><Link to='/info'>Qué es CATRA</Link></p>
      <p><Link to='/servivios'>Nuestros Servicios </Link></p>
      <p><Link to='/instalaciones'>Instalaciones </Link></p>
      <p><Link to='/categorias'>Categorias </Link></p>
    </>
  );
}

const BotonesNavbar = () => {

  const auth = useAuth()

  if (auth.isAuthenticated) {
    return (
      <button type="button"><Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>
        Dashboard</Link>
      </button>
    )
  } else {
    return (<>
      <button type="button"><Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
        Iniciar sesión</Link>
      </button>
      <button type="button"><Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
        Registrarse</Link>
      </button>
    </>)
  }
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (

    <div className='catra__navbar'>
      <div className='catra__navbar-links'>
        <div className='catra__navbar-links_logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='catra__navbar-links_container'>
          <Menu />
        </div>
      </div>

      <div className='catra__navbar-sign'>
        <BotonesNavbar />
      </div>
      <div className='catra__navbar-menu'>
        {toggleMenu

          ? <RiCloseLine color='black' size={30} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='black' size={30} onClick={() => setToggleMenu(true)} />
        }
        {
          toggleMenu && (
            <div className='catra__navbar-menu_container scale-up-center '>
              <div className='catra__navbar-menu_container_links'>
                <Menu />
                <div className='catra__navbar-menu_container-links-sign'>
                  <BotonesNavbar />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
