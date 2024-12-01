import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import axiosClient from '/src/axios-client.jsx';
import '/src/pages/examenes/RealizarExamen.css';
import useAuth from 'src/useAuth'
const RealizarExamen = () => {
    const [examen, setExamen] = useState([]);
    const navigate = useNavigate();
    const { examenId } = useParams({ strict: false });
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const curp = useAuth().cliente.curp;
    const handleAnswerChange = (preguntaId, respuestaId) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [preguntaId]: respuestaId,
        }));

    };

    const fetchPreguntas = async () => {
        try {
            const response = await axiosClient.get(`examen/${examenId}/all`);
            console.log(response.data);
            setExamen(response.data);
        } catch (error) {
            console.error("Error al obtener el examen:", error.response?.data || error.message);
        }
    };
    let count = 1;
    const inc_count = () => {
        count++;
    }
    useEffect(() => {
        fetchPreguntas();
    }, []);
    const handleFinishExam = async () => {
        const payload = {
            curp: curp,
            examenId: examenId,
            respuestas:selectedAnswers ,

        };
        try {
            await axiosClient.post('/examenes/terminar', payload);

            await navigate({ to: `/examenes/disponibles` });
        } catch (error) {
            console.log(error);
        }
        console.log(payload);
    };


    return (
        <div className="exam-container">
            <h1 className="exam-header">📝 Realizando Examen</h1>
            <div className="questions-container">
                {examen.map((examenItem) => (
                    <div key={examenItem.id} className="exam-section">
                        {examenItem.preguntas.map((pregunta, index) => (
                            <div className="question-card" key={pregunta.id}>
                                <h2 className="question-title">Pregunta {index + 1}: {pregunta.texto}</h2>

                                {/* Imagen de la pregunta */}
                                {pregunta.imagen_url && (
                                    <div className="question-image-container">
                                        <img
                                            src={pregunta.imagen_url}
                                            alt={`Imagen de la pregunta ${index + 1}`}
                                            className="question-image"
                                        />
                                    </div>
                                )}

                                {/* Opciones de respuesta */}
                                <div className="answers-grid">
                                    {pregunta.respuestas.map((respuesta) => (
                                        <div className="answer-option" key={respuesta.id}>
                                            <label className="answer-label">
                                                <input
                                                    type="radio"
                                                    name={`respuesta-${pregunta.id}`}
                                                    value={respuesta.id}
                                                    className="answer-radio"
                                                    onChange={() => handleAnswerChange(pregunta.id, respuesta.id)}
                                                />
                                                <div className="answer-content">
                                                    <span className="answer-text">{respuesta.texto}</span>
                                                    {respuesta.imagen_url && (
                                                        <img
                                                            src={respuesta.imagen_url}
                                                            alt={`Imagen de la respuesta ${respuesta.texto}`}
                                                            className="answer-image"
                                                        />
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="exam-footer">
                    <button onClick={() => handleFinishExam(examen, selectedAnswers)} className="finish-button">
                        Terminar Examen
                    </button>
                </div>
            </div>
        </div>

    );
};

export default RealizarExamen;
