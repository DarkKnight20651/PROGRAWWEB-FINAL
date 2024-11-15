import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '/src/assets/CATRAF.png'

const Menu = () => {
  return (
    <>
      <p><a href='/Crud'>Examenes </a></p>
      <p><a href='#Licencias'>Licencias </a></p>
      <p><a href='/Evaluaciones'>Usuarios </a></p>
      <p><a href='#Estadisticas'>Estadisticas </a></p>
      
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
       
        <button type="button" onClick={() => window.location.href = '/home'} >Salir</button>
      
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
                
                  <button type="button">SALIR</button>
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
