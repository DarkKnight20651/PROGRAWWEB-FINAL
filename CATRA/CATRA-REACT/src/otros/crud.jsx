import { Navbar2 } from '../components'
import { Footer } from '../containers'
import './evaluaciones.css'
const evaluaciones = () => {
  return (
    <div className="container">
        <Navbar2/>
        <h1>Administración de Exámenes</h1>
            <button className="add-exam">Crear Examen</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Examen Licencia A</td>
                        <td>2024-11-10</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Examen Licencia B</td>
                        <td>2024-11-11</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Examen Licencia C</td>
                        <td>2024-11-12</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Examen Licencia D</td>
                        <td>2024-11-13</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Examen Licencia E</td>
                        <td>2024-11-14</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Examen Licencia F</td>
                        <td>2024-11-15</td>
                        <td>
                            <button className="edit">Editar</button>
                            <button className="delete">Eliminar</button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <div className="footer">
                <p>Administración de Exámenes - Plataforma de Educación</p>
            </div>
            <Footer/>
        </div>
  )
}

export default evaluaciones

