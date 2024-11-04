import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '/src/assets/CATRAF.png'

const Menu = () => {
  return (
    <>
      <p><a href='#home'>Home </a></p>
      <p><a href='#whatiscatra'>Que es CATRA  </a></p>
      <p><a href='#nuestros_servicios'>Nuestros Servicios </a></p>
      <p><a href='#instalaciones'>Instalaciones </a></p>
      <p><a href='#categorias'>Categorias </a></p>
    </>
  );
}
const navbar = () => {
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
        <p>Sing In</p>
        <button type="button" onClick={() => window.location.href = '/login'} >Sing up</button>
      
      </div>
      <div className='catra__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color='white' size={30} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='white' size={30} onClick={() => setToggleMenu(true)} />
        }
        {
          toggleMenu && (
            <div className='catra__navbar-menu_container scale-up-center '>
              <div className='catra__navbar-menu_container_links'>
                <Menu />
                <div className='catra__navbar-menu_container-links-sign'>
                  <p>Sing In</p>
                  <button type="button">Sing up</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default navbar
