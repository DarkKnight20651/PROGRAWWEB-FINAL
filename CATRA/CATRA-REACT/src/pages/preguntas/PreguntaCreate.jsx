import { createRef } from 'react';


import axiosClient from "/src/axios-client.jsx";
import { useNavigate, useParams } from '@tanstack/react-router';

const PreguntaCreate = () => {
    const navigate = useNavigate();
    const { examenId } = useParams({ strict: false });
    const textoRef = createRef();
    const pathRef = createRef();

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();

        // Agregar otros campos al FormData si es necesario
        formData.append('texto', textoRef.current.value);
        formData.append('id_examen', examenId);

        // Agregar la imagen al FormData
        if (pathRef.current.files[0]) {
            formData.append('path_imagen', pathRef.current.files[0]);
        }

        try {
            await axiosClient.post('/preguntas', formData);
            alert("Pregunta creada");
            await navigate({ to: `/examenes/${examenId}/preguntas` });
        } catch (error) {
            console.log(error);
        }

    };

    const cancelar = async () => {
        await navigate({ to: `/examenes/${examenId}/preguntas` });
    }

    return (
        <div className="container">
            <h1 className="titulo" id="titulo">Agregar Pregunta</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Texto de la pregunta</label>
                    <input
                        ref={textoRef}
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Nombre del examen"
                        required
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">Cargar Imagen</label>
                    <input
                        ref={pathRef}
                        type="file"
                        className="form-control"
                        id="imagen"
                        accept=".jpg, .jpeg, .png"
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ padding: '10px 60px', fontSize: '25px' }}
                    >
                        Crear
                    </button>
                    <button
                        type="button"
                        onClick={cancelar}
                        className="btn btn-secondary"
                        style={{ padding: '10px 20px', fontSize: '25px', marginLeft: '10px' }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default PreguntaCreate;