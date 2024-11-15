import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import axiosClient from '../../axios-client';

const UserEdit = () => {
    const { userId } = useParams({ strict: false });
    const navigate = useNavigate();

    const roleRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfRef = useRef();

    useEffect(() => {
        axiosClient.get(`/users/${userId}`)
            .then(({ data }) => {
                roleRef.current.value = data.role;
                emailRef.current.value = data.email;
            })
            .catch((error) => console.error('Error al cargar usuario:', error));
    }, [userId]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConf: passwordConfRef.current.value,
            role: roleRef.current.value,
        };

        axiosClient.put(`/usuarios/${userId}`, payload)
            .then(() => {
                navigate('/usuarios'); 
            })
            .catch((err) => {
                console.error('Error al actualizar usuario:', err);
            });
    };

    const cancelar = () => {
        navigate("/usuarios");
    }

    return (
        <div className="container">
            <h1>Editar Usuario</h1>
            <form onSubmit={onSubmit}>
            <div className="mb-3">
                        <label htmlFor="role" className="form-label">Rol</label>
                        <select
                            ref={roleRef}
                            className="form-control"
                            id="role"
                            required
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="cliente">Cliente</option>
                            <option value="admin">Admin</option>
                            <option value="secre">Secretaria</option>
                        </select>
                    </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input ref={emailRef} type="email" className="form-control" id="email" placeholder="Correo Electrónico" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Contraseña" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ConfPassword" className="form-label">Confirmar Contraseña</label>
                    <input ref={passwordConfRef} type="password" className="form-control" id="ConfPassword" placeholder="Confirmar Contraseña" required />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 60px', fontSize: '20px' }}>
                        Guardar Cambios
                    </button>
                    
                </div>
            </form>
            <button onClick={cancelar} className="edit">Cancelar</button>
        </div>
    );
};

export default UserEdit;
