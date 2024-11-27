import { createRef } from 'react';

import axiosClient from "/src/axios-client.jsx";
import { useNavigate, useParams } from '@tanstack/react-router';

const RespuestaCreate = () => {
    const navigate = useNavigate();
    const { preguntaId, examenId } = useParams({ strict: false });
    const textoRef = createRef();
    const pathRef = createRef();
    const correctRef = createRef();

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();

        formData.append('texto', textoRef.current.value);
        formData.append('id_pregunta', preguntaId);
        formData.append('is_correct', correctRef.current.value);

        if (pathRef.current.files[0]) {
            formData.append('path_imagen', pathRef.current.files[0]);
        }

        try {
            await axiosClient.post('/respuestas', formData);
            alert("Creado");
            await navigate({ to: `/examenes/${examenId}/preguntas/${preguntaId}/respuestas` });
        } catch (error) {
            console.log(error);
        }
    };
    const cancelar = async () => {
        await navigate({ to: `/examenes/${examenId}/preguntas/${preguntaId}/respuestas` });
    }
    return (
        <div className="container">
            <h1 className="titulo" id="titulo">Agregar Respuesta</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Texto de la Respuesta</label>
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
                    <label htmlFor="iscorrect" className="form-label">Esta respuesta es correcta?</label>
                    <select
                        ref={correctRef}
                        className="form-control"
                        id="iscorrect"
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">Cargar Imagen (opcional)</label>
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
export default RespuestaCreate;