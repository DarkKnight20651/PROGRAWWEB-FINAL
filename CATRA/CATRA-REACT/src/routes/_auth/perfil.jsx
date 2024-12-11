import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import useAuth from 'src/useAuth'
import './perfil.css'
export const Route = createFileRoute('/_auth/perfil')({
  component: ProfilePage,
})

function ProfilePage() {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const auth = useAuth()

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' })
        })
      })
    }
  }

  return (
    <section className="grid gap-2 p-2">
      <h1> {auth.user?.email}</h1>
      {auth.user?.path_imagen ? (
            <img
              src={`http://localhost:8000/storage/${auth.user?.path_imagen}`}
              alt="Imagen de la pregunta"
              className="img-fluid"
              style={{ width: '100px', height: 'auto' }}
            />
          ) : (
            <p>No hay imagen disponible</p>
          )}
         
      <p>Tu rol es {auth.user?.role}</p>
      {auth.cliente && <p>{auth.cliente.name}</p>}
      <p>Estás actualmente en la ruta del perfil.</p>

      <div className="p-2 h-full">
        <p>Esta vista es solo para usuarios autenticados</p>
        <ul className="py-2 flex gap-2">
          <li>
            <Link
              to="/dashboard"
              className="hover:underline data-[status='active']:font-semibold"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <hr />
      </div>
    </section>
  )
}
