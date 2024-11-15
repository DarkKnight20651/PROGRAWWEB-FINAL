import { createFileRoute, Link, redirect, useRouter, useRouterState } from '@tanstack/react-router';
import useAuth from '../useAuth'
import { useState } from 'react';
import '../pages/signup/Signup.css'

const fallback = '/dashboard';

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: fallback });
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
    nombre: "",
    ape_p: "",
    ape_m: "",
    curp: "",
    fecha_nac: "",
    genero: 1,
    email: "",
    telefono: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGeneroChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData, 
      genero: value,  
    }));
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };

      const resultadoRegistroUsuario = await auth.signup(payload);

      if (resultadoRegistroUsuario === "Success") {
        
        const resultadoRegistroCliente = await auth.registrar_cliente(
          {...payload, id_user: resultadoRegistroUsuario.data.user.id}
        );

        if(resultadoRegistroCliente === "Success") {
          await router.invalidate();
          await navigate({ to: "/dashboard" });
        }
      }
    } catch (error) {
      console.log("ERROR - ", error);
      setErrors(() => error.mensajes || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegistering = isLoading || isSubmitting;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h1 className="text-center">Registrarse</h1><br></br>
        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isRegistering}>
          {/* Personal Information Section */}
          <div className="section">
            <h3 className='subtitle'>Información Personal</h3>
            <br></br>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input value={formData.nombre}
                  id="nombre"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div className="col">
                <label htmlFor="apep" className="form-label">Apellido Paterno</label>
                <input value={formData.ape_p}
                  id="apep"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu apellido"
                />
              </div>

              <div className="col">
                <label htmlFor="nombre" className="form-label">Apellido Materno</label>
                <input value={formData.ape_m}
                  id="ape_m"
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu apellido materno"
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="curp" className="form-label">Curp</label>
                  <input value={formData.curp}
                    id="curp"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu curp"
                  />
                </div>
                <div className="col">
                  <label htmlFor="fechanac" className="form-label">Fecha de Nacimiento</label>
                  <input value={formData.fecha_nac}
                    id="fecha_nac"
                    type="date"
                    className="form-control"
                    placeholder="Ingresa tu fecha de nacimiento"
                  />
                </div>

                <div className="col">
                  <label htmlFor="genero" className="form-label">Género</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        value={1}
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        checked={formData.genero === 1}
                        onChange={handleGeneroChange}
                      />
                      <label className="form-check-label" htmlFor="masculino">
                        Masculino
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        value={1}
                        checked={formData.genero === 0}
                        onChange={handleGeneroChange}
                      />
                      <label className="form-check-label" htmlFor="femenino">
                        Femenino
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          {/* Contact Information Section */}
          <div className="section">
            <h3 className='subtitle'>Información de Contacto</h3>
            <br></br>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email" className="form-label">Dirección de Correo</label>
                <input value={formData.email}
                  id="email"
                  onChange={handleChange}
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>
              <div className="col">
                <label htmlFor="tel" className="form-label">Número de Teléfono</label>
                <input value={formData.telefono}
                  id="tel"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu número de teléfono"
                />
              </div>
            </div>
          </div>
          <br></br>

          {/* Account Credentials Section */}
          <div className="section">
            <h3 className='subtitle'>Seguridad </h3>
            <br></br>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input value={formData.password}
                  onChange={handleChange}
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              <div className="col">
                <label htmlFor="repassword" className="form-label">Confirmar Contraseña</label>
                <input value={formData.password_confirmation}
                  id="password_confirmation"
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  placeholder="Confirma tu contraseña"
                />
              </div>
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>

          <div>
            ¿Ya estás registrado? <Link to="/login">Iniciar Sesión</Link>
          </div>
          </fieldset>
        </form>

      </div>
    </div>
  );
}

