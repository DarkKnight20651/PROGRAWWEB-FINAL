import React, { useState, createRef, useEffect, useRef, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '/src/axios-client.jsx';
import { useStateContext } from "/src/contexts/ContextProvider.jsx";

const UserEdit = () => {
    const { curp } = useParams();

    const navigate = useNavigate();
    const nameRef = useRef()
    const apep = useRef()
    let iduser
    const apem = useRef()
    const birth = useRef()
    const emailRef = useRef()
    const tel = useRef()
    const genderRef = useRef()
    const passwordRef = useRef()
    const curpRef = useRef()
    const passwordConfirmationRef = useRef()


    useEffect(() => {


        axiosClient.get(`/clientes/${curp}`)
            .then(({ data }) => {

                nameRef.current.value = data.nombre;
                apep.current.value = data.ape_p;
                apem.current.value = data.ape_m;
                curpRef.current.value = data.curp;
                birth.current.value = data.fecha_nac;
                genderRef.current.value = data.genero;
                tel.current.value = data.telefono;
                iduser = data.id_user;


                // Segunda solicitud dentro del `then`
                axiosClient.get(`/users/${iduser}`)
                    .then(({ data }) => {
                        // Aquí puedes actualizar otros valores si es necesario
                        emailRef.current.value = data.email;

                    })
                    .catch((error) => console.error('Error en la primera solicitud:', error));
            })
            .catch((error) => console.error('Error en la segunda solicitud:', error));

    })

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {

            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConf: passwordConfirmationRef.current.value,
        };
        const payload2={
            nombre: nameRef.current.value,
            ape_p: apep.current.value,
            ape_m: apem.current.value,
            fecha_nac: birth.current.value,
            genero: genderRef.current.value,

            telefono: tel.current.value,

           
            


            curp: curpRef.current.value
        }
        axiosClient.put(`/users/${iduser}`, payload)
            .then(() => {
                // Redirige a la lista de usuarios después de editar
                axiosClient.put(`/clientes/${curp}`, payload2)
                    .then(() => {
                        navigate("/clientes");
                    })
                    .catch((err) => {
                        console.error('Error al actualizar usuario:', err);
                    });
            })
            .catch((err) => {
                console.error('Error al actualizar usuario:', err);
            });
    };
    const cancelar = () => {
        navigate("/clientes");
    }
    return (
        <>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 w-50">
                    <h1 className="text-center">Editar Cliente</h1><br></br>
                    <form onSubmit={onSubmit}>
                        {/* Personal Information Section */}
                        <div className="section">
                            <h3 className='subtitle'>Información Personal</h3>
                            <br></br>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input ref={nameRef}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Ingresa tu nombre"
                                    />
                                </div>

                                <div className="col">
                                    <label htmlFor="apep" className="form-label">Apellido Paterno</label>
                                    <input ref={apep}
                                        type="text"
                                        className="form-control"
                                        id="apep"
                                        placeholder="Ingresa tu apellido"
                                    />
                                </div>

                                <div className="col">
                                    <label htmlFor="nombre" className="form-label">Apellido Materno</label>
                                    <input ref={apem}
                                        type="text"
                                        className="form-control"
                                        id="apem"
                                        placeholder="Ingresa tu apellido materno"
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="curp" className="form-label">Curp</label>
                                        <input ref={curpRef}
                                            type="text"
                                            className="form-control"
                                            id="curp"

                                            placeholder="Ingresa tu curp"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="fechanac" className="form-label">Fecha de Nacimiento</label>
                                        <input ref={birth}
                                            type="date"
                                            className="form-control"
                                            id="fechanac"

                                            placeholder="Ingresa tu fecha de nacimiento"
                                        />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="genero" className="form-label">Género</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    ref={genderRef}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="genero"
                                                    id="masculino"
                                                    value="1"
                                                />
                                                <label className="form-check-label" htmlFor="masculino">
                                                    Masculino
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    ref={genderRef}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="genero"
                                                    id="femenino"
                                                    value="0"
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
                                    <input ref={emailRef}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ingresa tu correo electrónico"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="tel" className="form-label">Número de Teléfono</label>
                                    <input ref={tel}
                                        type="text"
                                        className="form-control"
                                        id="tel"
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
                                    <input ref={passwordRef}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="repassword" className="form-label">Confirmar Contraseña</label>
                                    <input ref={passwordConfirmationRef}
                                        type="password"
                                        className="form-control"
                                        id="repassword"
                                        placeholder="Confirma tu contraseña"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button Section */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Aplicar
                            </button>
                        </div>


                    </form>

                </div >
            </div >
        </>
    );
};

export default UserEdit;
