import { createFileRoute, Link, redirect, useRouter, useRouterState } from '@tanstack/react-router';
import useAuth from '../useAuth'
import { useState } from 'react';
import { access_token_key } from '../auth-utils';

const fallback = '/dashboard';

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: SignupComponent,
});

function SignupComponent() {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: "a",
    apellido_paterno: "a",
    apellido_materno: "a",
    fecha_nacimiento: "2024-11-10",
    email: "a1@gmail.com",
    num_telefono: "12345",
    password: "12345",
    password_confirmation: "12345",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };

      const resultado = await auth.signup(payload);

      if (resultado === "Success") {
        console.log(
          "TOKEN SIGNUP SUCCESS, LOCAL STORAGE",
          localStorage.getItem(access_token_key)
        );
        await router.invalidate();

        await navigate({ to: "/dashboard" });
      }
    } catch (error) {
      console.log("ERROR - ", error.mensajes);
      setErrors(() => error.mensajes || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegistering = isLoading || isSubmitting;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h3 className="text-center">Registrarse</h3>
        <br />
        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isRegistering}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                />
                {errors.nombre && (
                  <div className="text-danger">{errors.nombre.join(", ")}</div>
                )}
              </div>
              <div className="col">
                <label htmlFor="apellido_paterno" className="form-label">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido_paterno"
                  value={formData.apellido_paterno}
                  onChange={handleChange}
                  placeholder="Ingresa tu apellido"
                />
                {errors.apellido_paterno && (
                  <div className="text-danger">
                    {errors.apellido_paterno.join(", ")}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="apellido_materno" className="form-label">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido_materno"
                  value={formData.apellido_materno}
                  onChange={handleChange}
                  placeholder="Ingresa tu apellido materno"
                />
                {errors.apellido_materno && (
                  <div className="text-danger">
                    {errors.apellido_materno.join(", ")}
                  </div>
                )}
              </div>
              <div className="col">
                <label htmlFor="fecha_nacimiento" className="form-label">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  placeholder="Ingresa tu fecha de nacimiento"
                />
                {errors.fecha_nacimiento && (
                  <div className="text-danger">
                    {errors.fecha_nacimiento.join(", ")}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo electrónico"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.join(", ")}</div>
                )}
              </div>
              <div className="col">
                <label htmlFor="num_telefono" className="form-label">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="num_telefono"
                  value={formData.num_telefono}
                  onChange={handleChange}
                  placeholder="Ingresa tu teléfono"
                />
                {errors.num_telefono && (
                  <div className="text-danger">
                    {errors.num_telefono.join(", ")}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                />
                {errors.password && (
                  <div className="text-danger">
                    {errors.password.join(", ")}
                  </div>
                )}
              </div>
              <div className="col">
                <label htmlFor="password_confirmation" className="form-label">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña"
                />
                {errors.password_confirmation && (
                  <div className="text-danger">
                    {errors.password_confirmation.join(", ")}
                  </div>
                )}
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
            <p>
              Ya estás registrado? <Link to="/login">Iniciar Sesión</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

