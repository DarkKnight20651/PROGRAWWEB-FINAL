import { createFileRoute, Link, useRouter, useRouterState } from '@tanstack/react-router';
import useAuth from '../useAuth';
import { useState } from 'react';
import '../styles/index.css';
import '../assets/bootstrap.min.css';

import './Signup.css';
import { fallback } from '/src/auth-utils';
import guestGuard from '../util/guestGuard';

export const Route = createFileRoute('/signup')({
  beforeLoad: async ({ context }) => {
    await guestGuard(context, fallback);
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
  const [passwordMismatch, setPasswordMismatch] = useState(false);
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
    if (formData.password !== formData.password_confirmation) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    setIsSubmitting(true);
    try {
      const payload = { ...formData };

      const resultado = await auth.signup(payload);

      if (resultado === "Success") {
        await router.invalidate();
        await navigate({ to: "/dashboard" });
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
        <h1 className="text-center">Registrarse</h1>
        <p className="text-center" id="rest">Los campos con <span className="text-danger">*</span> son obligatorios</p>
        <br />
        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isRegistering}>
            {/* Personal Information Section */}
            <div className="section">
              <h3 className='subtitle'>Información Personal</h3>
              <br />
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                  <input value={formData.nombre}
                    onChange={handleChange}
                    id="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="ape_p" className="form-label">Apellido Paterno <span className="text-danger">*</span></label>
                  <input value={formData.ape_p}
                    id="ape_p"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido"
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="ape_m" className="form-label">Apellido Materno <span className="text-danger">*</span></label>
                  <input value={formData.ape_m}
                    onChange={handleChange}
                    id="ape_m"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido materno"
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="curp" className="form-label">Curp <span className="text-danger">*</span></label>
                    <input value={formData.curp}
                      onChange={handleChange}
                      id="curp"
                      type="text"
                      className="form-control"
                      placeholder="Ingresa tu curp"
                      required
                      pattern="[A-Z0-9]{18}"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="fecha_nac" className="form-label">Fecha de Nacimiento <span className="text-danger">*</span></label>
                    <input value={formData.fecha_nac}
                      onChange={handleChange} 
                      id="fecha_nac"
                      type="date"
                      className="form-control"
                      placeholder="Ingresa tu fecha de nacimiento"
                      required
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="genero" className="form-label">Género <span className="text-danger">*</span></label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="genero"
                          value={1}
                          checked={formData.genero === 1}
                          onChange={handleGeneroChange}
                          required
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
                          value={0}
                          checked={formData.genero === 0}
                          onChange={handleGeneroChange}
                          required
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
            <br />
            {/* Contact Information Section */}
            <div className="section">
              <h3 className='subtitle'>Información de Contacto</h3>
              <br />
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="email" className="form-label">Dirección de Correo <span className="text-danger">*</span></label>
                  <input value={formData.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="telefono" className="form-label">Número de Teléfono <span className="text-danger">*</span></label>
                  <input value={formData.telefono}
                    onChange={handleChange}
                    id="telefono"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu número de teléfono"
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            {/* Account Credentials Section */}
            <div className="section">
              <h3 className='subtitle'>Seguridad</h3>
              <br />
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="password" className="form-label">Contraseña <span className="text-danger">*</span></label>
                  <input value={formData.password}
                    onChange={handleChange}
                    id="password"
                    type="password"
                    className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
                    placeholder="Ingresa tu contraseña"
                    required
                    minLength="8"
                  />
                </div>
                <div className="col">
                  <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña <span className="text-danger">*</span></label>
                  <input value={formData.password_confirmation}
                    id="password_confirmation"
                    onChange={handleChange}
                    type="password"
                    className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
                    placeholder="Confirma tu contraseña"
                    required
                    minLength="8"
                  />
                  {passwordMismatch && <div className="invalid-feedback">Las contraseñas no coinciden.</div>}
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