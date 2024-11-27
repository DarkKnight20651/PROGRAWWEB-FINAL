/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export default function ClienteForm({ title, formData, setFormData, onFormSubmit, isRegistering, errors, SubmitComponent }) {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    let { id, value, name } = e.target;
    if (name === "genero") {
      value = parseInt(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.ape_p) newErrors.ape_p = "El apellido paterno es obligatorio.";
    if (!formData.ape_m) newErrors.ape_m = "El apellido materno es obligatorio.";
    if (!formData.curp) newErrors.curp = "El CURP es obligatorio.";
    if (!formData.fecha_nac) newErrors.fecha_nac = "La fecha de nacimiento es obligatoria.";
    if (!formData.genero && formData.genero !== 0) newErrors.genero = "El género es obligatorio.";
    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio.";
    if (!formData.telefono) newErrors.telefono = "El número de teléfono es obligatorio.";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
    if (!formData.password_confirmation) newErrors.password_confirmation = "La confirmación de la contraseña es obligatoria.";
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Las contraseñas no coinciden.";
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onFormSubmit(e);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4 w-50">
        <h1 className="text-center">{title}</h1><br></br>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isRegistering}>
            <div className="section">
              <h3 className='subtitle'>Información Personal</h3>
              <p className="text-center" id="rest">Los campos con <span className="text-danger">*</span> son obligatorios</p>
              <br />
              <br></br>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                  <input value={formData.nombre}
                    onChange={handleChange}
                    id="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                  />
                  {fieldErrors.nombre && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.nombre}</span>}
                </div>

                <div className="col">
                  <label htmlFor="ape_p" className="form-label">Apellido Paterno<span className="text-danger">*</span></label>
                  <input value={formData.ape_p}
                    id="ape_p"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido"
                  />
                  {fieldErrors.ape_p && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.ape_p}</span>}
                </div>

                <div className="col">
                  <label htmlFor="ape_m" className="form-label">Apellido Materno<span className="text-danger">*</span></label>
                  <input value={formData.ape_m}
                    onChange={handleChange}
                    id="ape_m"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido materno"
                  />
                  {fieldErrors.ape_m && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.ape_m}</span>}
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="curp" className="form-label">Curp<span className="text-danger">*</span></label>
                    <input value={formData.curp}
                      onChange={handleChange}
                      id="curp"
                      type="text"
                      className="form-control"
                      placeholder="Ingresa tu curp"
                    />
                    {fieldErrors.curp && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.curp}</span>}
                  </div>

                  <div className="col">
                    <label htmlFor="fecha_nac" className="form-label">Fecha de Nacimiento<span className="text-danger">*</span></label>
                    <input value={formData.fecha_nac}
                      onChange={handleChange}
                      id="fecha_nac"
                      type="date"
                      className="form-control"
                      placeholder="Ingresa tu fecha de nacimiento"
                    />
                    {fieldErrors.fecha_nac && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.fecha_nac}</span>}
                  </div>

                  <div className="col">
                    <label htmlFor="genero" className="form-label">Género<span className="text-danger">*</span></label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="genero"
                          value={1}
                          checked={formData.genero === 1}
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="femenino">
                          Femenino
                        </label>
                      </div>
                    </div>
                    {fieldErrors.genero && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.genero}</span>}
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="section">
              <h3 className='subtitle'>Información de Contacto</h3>
              <br></br>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="email" className="form-label">Correo Electronico<span className="text-danger">*</span></label>
                  <input value={formData.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                  />
                  {fieldErrors.email && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.email}</span>}
                </div>

                <div className="col">
                  <label htmlFor="telefono" className="form-label">Número de Teléfono<span className="text-danger">*</span></label>
                  <input value={formData.telefono}
                    onChange={handleChange}
                    id="telefono"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu número de teléfono"
                    pattern="\d{10}" /* Pattern to ensure exactly 10 digits */
                    title="El número de teléfono debe tener exactamente 10 dígitos."
                  />
                  {fieldErrors.telefono && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.telefono}</span>}
                </div>

              </div>
            </div>
            <br></br>

            <div className="section">
              <h3 className='subtitle'>Seguridad </h3>
              <br></br>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="password" className="form-label">Contraseña<span className="text-danger">*</span></label>
                  <input value={formData.password}
                    onChange={handleChange}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                  />
                  {fieldErrors.password && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.password}</span>}
                </div>

                <div className="col">
                  <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña<span className="text-danger">*</span></label>
                  <input value={formData.password_confirmation}
                    id="password_confirmation"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Confirma tu contraseña"
                  />
                  {fieldErrors.password_confirmation && <span style={{ color: '#F00', fontSize: '15px' }}>{fieldErrors.password_confirmation}</span>}
                </div>
              </div>
            </div>

            {SubmitComponent}

          </fieldset>
        </form>
      </div>
    </div>
  );
}