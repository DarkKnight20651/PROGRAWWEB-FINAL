
/* eslint-disable react/prop-types */
export default function ClienteForm({ title, formData, setFormData, onFormSubmit, 
  isRegistering, errors, SubmitComponent }) {
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

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4 w-50">
        <h1 className="text-center">{title}</h1><br></br>
        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isRegistering}>
            <div className="section">
              <h3 className='subtitle'>Información Personal</h3>
              <br></br>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input value={formData.nombre}
                    onChange={handleChange}
                    id="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                  />
                  {errors.nombre && (
                    errors.nombre.map((error, index) => (
                      <span style={{ color: '#F00', fontSize: '15px' }} key={`nombre_${index}`}>{error}</span>
                    ))
                  )}
                </div>

                <div className="col">
                  <label htmlFor="apep" className="form-label">Apellido Paterno</label>
                  <input value={formData.ape_p}
                    id="ape_p"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido"
                  />
                  {errors.ape_p && (
                    errors.ape_p.map((error, index) => (
                      <span style={{ color: '#F00', fontSize: '15px' }} key={`ape_p_${index}`}>{error}</span>
                    ))
                  )}
                </div>

                <div className="col">
                  <label htmlFor="apem" className="form-label">Apellido Materno</label>
                  <input value={formData.ape_m}
                    onChange={handleChange}
                    id="ape_m"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido materno"
                  />
                  {errors.ape_m && (
                    errors.ape_m.map((error, index) => (
                      <span style={{ color: '#F00', fontSize: '15px' }} key={`ape_m_${index}`}>{error}</span>
                    ))
                  )}
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="curp" className="form-label">Curp</label>
                    <input value={formData.curp}
                      onChange={handleChange}
                      id="curp"
                      type="text"
                      className="form-control"
                      placeholder="Ingresa tu curp"
                    />
                    {errors.curp && (
                      errors.curp.map((error, index) => (
                        <span style={{ color: '#F00', fontSize: '15px' }} key={`curp_${index}`}>{error}</span>
                      ))
                    )}
                  </div>

                  <div className="col">
                    <label htmlFor="fechanac" className="form-label">Fecha de Nacimiento</label>
                    <input value={formData.fecha_nac}
                      onChange={handleChange}
                      id="fecha_nac"
                      type="date"
                      className="form-control"
                      placeholder="Ingresa tu fecha de nacimiento"
                    />
                    {errors.fecha_nac && (
                      errors.fecha_nac.map((error, index) => (
                        <span style={{ color: '#F00', fontSize: '15px' }} key={`fecha_nac_${index}`}>{error}</span>
                      ))
                    )}
                  </div>

                  <div className="col">
                    <label htmlFor="genero" className="form-label">Género</label>
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
                    {errors.genero && (
                      errors.genero.map((error, index) => (
                        <span style={{ color: '#F00', fontSize: '15px' }} key={`genero_${index}`}>{error}</span>
                      ))
                    )}
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
                  <label htmlFor="email" className="form-label">Dirección de Correo</label>
                  <input value={formData.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                  />
                  {errors.email && (
                    errors.email.map((error, index) => (
                      <span style={{ color: '#F00', fontSize: '15px' }} key={`email_${index}`}>{error}</span>
                    ))
                  )}
                </div>

                <div className="col">
                  <label htmlFor="tel" className="form-label">Número de Teléfono</label>
                  <input value={formData.telefono}
                    onChange={handleChange}
                    id="telefono"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu número de teléfono"
                  />
                  {errors.telefono && (
                    errors.telefono.map((error, index) => (
                      <span style={{ color: '#F00', fontSize: '15px' }} key={`telefono_${index}`}>{error}</span>
                    ))
                  )}
                </div>

              </div>
            </div>
            <br></br>

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
                  {errors.password && (
                    errors.password.map((error, index) => (
                      <span style={{ color: '#F00', fontSize: '15px' }} key={`password_${index}`}>{error}</span>
                    ))
                  )}
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

            {SubmitComponent}

          </fieldset>
        </form>
      </div>
    </div>
  );
}