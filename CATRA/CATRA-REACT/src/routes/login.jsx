import {
  createFileRoute,
  Link,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'

import 'src/pages/login/Login.css'
import useAuth from 'src/useAuth'
import { fallback } from 'src/auth-utils'
import guestGuard from 'src/util/guestGuard'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    guestGuard(context, fallback);
  },
  component: LoginComponent,
})

function LoginComponent() {
  const auth = useAuth()
  const navigate = Route.useNavigate()
  const router = useRouter()
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({});

  const emailRef = useRef();
  const passwordRef = useRef();
  
  const search = Route.useSearch()

  const onFormSubmit = async (evt) => {
    setIsSubmitting(true)
    evt.preventDefault()
    try {
        const resultado = await auth.login(emailRef.current?.value, passwordRef.current?.value)

        if(resultado === "Success") {
            await router.invalidate()
            await navigate({ to: search.redirect || fallback })
        }
    } catch (error) {
      console.log(error.mensajes);
      
      setErrors(() => error.mensajes || {});
    } finally {
      setIsSubmitting(false)
    }

  }

  const isLoggingIn = isLoading || isSubmitting

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-25">
        <h3 className="text-center">INICIAR SESIÓN</h3>

        {search.redirect && (
        <p className="text-red-500">Primero necesitas iniciar sesión.</p>
        )}

        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isLoggingIn}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">DIRECCIÓN DE CORREO</label>
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              id="email"
              placeholder="INGRESA EMAIL"
            />

            {errors.email && (
              <ul className="list-unstyled"> {/* Elimina el margen izquierdo */}
                {errors.email.map((error, index) => (
                  <li key={index} className="text-danger">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">CONTRASEÑA</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              id="password"
              placeholder="CONTRASEÑA"
            />

            {errors.password && (
              <ul className="list-unstyled"> {/* Elimina el margen izquierdo */}
                {errors.password.map((error, index) => (
                  <li key={index} className="text-danger">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              INGRESAR
            </button>
          </div>
          ¿Aún no te has registrado? <Link to="/signup">Registrarse</Link>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
