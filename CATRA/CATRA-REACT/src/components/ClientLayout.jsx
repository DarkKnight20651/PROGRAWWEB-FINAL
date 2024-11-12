import { Link } from "@tanstack/react-router";

function AdminLayout() {
  return (
    <div>
      <h1>Esta es la página del usuario cliente</h1>

      <p><Link to="/perfil">Perfil</Link></p>
      <p><Link to="/subir-documentos">Subir documentos</Link></p>
      <p><Link to="/realizar-examen">Realizar examen</Link></p>
    </div>
  )
}

export default AdminLayout;