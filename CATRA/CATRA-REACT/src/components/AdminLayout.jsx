import { Link } from "@tanstack/react-router";
import {  } from "react";

function AdminLayout() {
  return (
    <div>
      <h1>Esta es la página del usuario administrador</h1>

      <p><Link to="/perfil">Perfil</Link></p>
      <p><Link to="/revisar-documentos">Revisar documentos</Link></p>
      <p><Link to="/administrar-clientes">Administrar clientes</Link></p>
    </div>
  )
}

export default AdminLayout;