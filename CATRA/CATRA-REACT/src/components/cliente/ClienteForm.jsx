/* eslint-disable react/prop-types */
import { useState } from "react";

const camposIgnorarNumeros = ["nombre", "ape_p", "ape_m"];
const camposIgnorarLetras = ["telefono"];

function traducirCampo(campo) {
  const traducciones = {
    nombre: "Nombre",
    ape_p: "Apellido Paterno",
    ape_m: "Apellido Materno",
    curp: "CURP",
    fecha_nac: "Fecha de Nacimiento",
    email: "Correo Electrónico",
    telefono: "Teléfono",
    password: "Contraseña",
    password_confirmation: "Confirmación de Contraseña",
  };

  return traducciones[campo] || campo;
}

export default function ClienteForm({ title, formData, setFormData, onFormSubmit,
  isRegistering, SubmitComponent, isEditing = false }) {
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    let { id, value, name } = e.target;
    console.log(id);

    if (name === "genero") {
      value = parseInt(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      const soloLetras = /^[a-zA-Z\s]*$/;
      const phoneRegex = /^\d+$/;

      if (camposIgnorarNumeros.includes(id) && !soloLetras.test(value)) {
        return;
      }

      if (camposIgnorarLetras.includes(id) && !phoneRegex.test(value)) {
        return;
      }

      console.log(value, typeof value, value.trim());

      setFormData((prevData) => ({
        ...prevData,
        [id]: value.trim(),
      }));
    }
  };

  const validateField = (field, value) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (field === "email") {
      console.log(!value);
    }


    if (!isEditing && !value && ["nombre", "ape_p", "curp", "fecha_nac", "email",
      "telefono", "password", "password_confirmation"].includes(field)) {
      errors.push(`El campo ${traducirCampo(field)} es obligatorio.`);
    } else if (!value && ["nombre", "ape_p", "curp", "fecha_nac", "email", "telefono"]
      .includes(field)) {
      errors.push(`El campo ${traducirCampo(field)} es obligatorio.`);
    } else {
      if (field === "password" && value && value.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres.");
      }

      if (field === "password_confirmation" && formData.password !== "" &&
        value !== formData.password) {
        errors.push("Las contraseñas no coinciden.");
      }

      if (field === "fecha_nac") {
        const fechaNacimiento = new Date(value);
        const fechaHoy = new Date();
        let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = fechaHoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimiento.getDate())) {
          edad--;
        }
        if (edad < 18) errors.push("No se aceptan personas menores de edad");
        else if (edad > 55) errors.push("No se aceptan personas mayores de 55 años");
      }

      if (field === "telefono" && value && !phoneRegex.test(value)) {
        errors.push("El número de teléfono debe tener 10 digitos");
      }

      if (field === "email" && value && !emailRegex.test(value)) {
        errors.push("El correo electrónico no es válido.");
      }
    }
    return errors;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const errors = validateField(id, value.trim());
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errors.length > 0 ? errors : undefined,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const errors = validateField(field, formData[field]);
      if (errors.length > 0) {
        newErrors[field] = errors;
      }
    });
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
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="card p-4 w-50">
        <h1 className="text-center">{title}</h1>
        <br />
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
                    onBlur={handleBlur}
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                  />
                  {fieldErrors.nombre && fieldErrors.nombre.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
                </div>

                <div className="col">
                  <label htmlFor="ape_p" className="form-label">Apellido Paterno<span className="text-danger">*</span></label>
                  <input value={formData.ape_p}
                    id="ape_p"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido"
                  />
                  {fieldErrors.ape_p && fieldErrors.ape_p.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
                </div>

                <div className="col">
                  <label htmlFor="ape_m" className="form-label">Apellido Materno</label>
                  <input value={formData.ape_m}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="ape_m"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido materno"
                  />
                  {fieldErrors.ape_m && fieldErrors.ape_m.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="curp" className="form-label">Curp<span className="text-danger">*</span></label>
                    <input value={formData.curp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="curp"
                      type="text"
                      className="form-control"
                      placeholder="Ingresa tu curp"
                    />
                    {fieldErrors.curp && fieldErrors.curp.map((error, idx) => (
                      <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                        {error}
                      </span>
                    ))}
                  </div>

                  <div className="col">
                    <label htmlFor="fecha_nac" className="form-label">Fecha de Nacimiento<span className="text-danger">*</span></label>
                    <input value={formData.fecha_nac}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="fecha_nac"
                      type="date"
                      className="form-control"
                      placeholder="Ingresa tu fecha de nacimiento"
                    />
                    {fieldErrors.fecha_nac && fieldErrors.fecha_nac.map((error, idx) => (
                      <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                        {error}
                      </span>
                    ))}
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
                          onBlur={handleBlur}
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
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label" htmlFor="femenino">
                          Femenino
                        </label>
                      </div>
                    </div>
                    {fieldErrors.genero && fieldErrors.genero.map((error, idx) => (
                      <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                        {error}
                      </span>
                    ))}
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
                    onBlur={handleBlur}
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                  />
                  {fieldErrors.email && fieldErrors.email.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
                </div>

                <div className="col">
                  <label htmlFor="telefono" className="form-label">Número de Teléfono<span className="text-danger">*</span></label>
                  <input value={formData.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="telefono"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu número de teléfono"
                    title="El número de teléfono debe tener exactamente 10 dígitos."
                  />
                  {fieldErrors.telefono && fieldErrors.telefono.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
                </div>

              </div>
            </div>
            <br></br>

            <div className="section">
              <h3 className='subtitle'>Seguridad </h3>
              <br></br>
              {isEditing && <p>Si no deseas actualizar la contraseña, puedes dejar en blanco los siguientes campos</p>}
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="password" className="form-label">Contraseña{!isEditing && <span className="text-danger">*</span>}</label>
                  <input value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                  />
                  {fieldErrors.password && fieldErrors.password.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
                </div>

                <div className="col">
                  <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña{!isEditing && <span className="text-danger">*</span>}</label>
                  <input value={formData.password_confirmation}
                    id="password_confirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className="form-control"
                    placeholder="Confirma tu contraseña"
                  />
                  {fieldErrors.password_confirmation && fieldErrors.password_confirmation.map((error, idx) => (
                    <span key={idx} style={{ color: "#F00", fontSize: "15px" }}>
                      {error}
                    </span>
                  ))}
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
