import React from 'react'
import './evaluaciones.css'
import {Footer, Header,Blog,Features,Posibility,WhatCATRA} from './containers'
import {Article, Cta, Navbar2,Brand} from './components'
const evaluaciones = () => {
  return (
    <div className="container">
        <Navbar2/>
        <h1>Alta  de Usuarios</h1>
            <button className="add-user">Agregar Usuario</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="footer">
                <p>CRUD de Usuarios - Ejemplo de Aplicación</p>
            </div>
            <Footer/>
        </div>
  )
}

export default evaluaciones

