import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import axiosClient from '/src/axios-client.jsx';
import '/src/pages/examenes/RealizarExamen.css';
import useAuth from 'src/useAuth';

const RealizarExamen = () => {
    const [examen, setExamen] = useState([]);
    const [tiempo, setTiempo] = useState([]); // Tiempo inicial en minutos (decimal)
    const [segundosRestantes, setSegundosRestantes] = useState(50); // Tiempo en segundos
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
    const navigate = useNavigate();
    const { examenId } = useParams({ strict: false });
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const auth = useAuth();
    const curp = auth.user?.cliente?.curp;

    const getTiempoRestante = () => {
        const payload = { curp, examenId };
        axiosClient.post('/examenes/getTiempoRestante', payload)
            .then(response => {
                setTiempo(response.data);
                setSegundosRestantes(Math.floor(response.data * 60)); // Convertir minutos a segundos
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleAnswerChange = async (preguntaId, respuestaId) => {
        setSelectedAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers, [preguntaId]: respuestaId };
            const payload = { curp, examenId, respuestas: updatedAnswers };
            axiosClient.post('/examenes/autoguardar', payload).catch(console.log);
            return updatedAnswers;
        });
    };

    const fetchPreguntas = async () => {
        try {
            const payload = { curp, examenId };
            await axiosClient.post('/examenes/comenzar', payload, { retry: 0 });
            const response = await axiosClient.get(`examen/${examenId}/all`);
            setExamen(response.data);
        } catch (error) {
            showAlert();
            navigate({ to: `/examenes/disponibles` });
        }
    };

    const handleFinishExam = async () => {
        const payload = { curp, examenId };
        try {
            await axiosClient.post('/examenes/terminar', payload);
            navigate({ to: `/examenes/disponibles` });
        } catch (error) {
            console.log(error);
        }
    };

    function showAlert() {
        const alertBox = document.getElementById("alert-message");
        alertBox.classList.remove("hidden");
    }

    function closeAlert() {
        const alertBox = document.getElementById("alert-message");
        alertBox.classList.add("hidden");
    }

    useEffect(() => {
        fetchPreguntas();
        getTiempoRestante();
    }, []);

    useEffect(() => {
        if (segundosRestantes > 0) {
            const interval = setInterval(() => {
                setSegundosRestantes((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            showAlert();
            setBotonDeshabilitado(true);
            handleFinishExam();
            
        }
    }, [segundosRestantes]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="exam-container">
                <h1 className="exam-header">
                    📝 Realizando Examen - Tiempo restante: {formatTime(segundosRestantes)}
                </h1>
                <div className="questions-container">
                    {examen.map((examenItem) => (
                        <div key={examenItem.id} className="exam-section">
                            {examenItem.preguntas.map((pregunta, index) => (
                                <div className="question-card" key={pregunta.id}>
                                    <h2 className="question-title">Pregunta {index + 1}: {pregunta.texto}</h2>
                                    {pregunta.imagen_url && (
                                        <div className="question-image-container">
                                            <img
                                                src={pregunta.imagen_url}
                                                alt={`Imagen de la pregunta ${index + 1}`}
                                                className="question-image"
                                            />
                                        </div>
                                    )}
                                    <div className="answers-grid">
                                        {pregunta.respuestas.map((respuesta) => (
                                            <div className="answer-option" key={respuesta.id}>
                                                <label className="answer-label">
                                                    <input
                                                        type="radio"
                                                        name={`respuesta-${pregunta.id}`}
                                                        value={respuesta.id}
                                                        className="answer-radio"
                                                        onClick={() => handleAnswerChange(pregunta.id, respuesta.id)}
                                                        
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
                        <button
                            onClick={handleFinishExam}
                            className="finish-button"
                            disabled={botonDeshabilitado}
                        >
                            Terminar Examen
                        </button>
                    </div>
                </div>
            </div>
            <div id="alert-message" className="alert hidden">
                <p>❌ Este examen no está disponible para ti.</p>
                <button onClick={closeAlert}>Cerrar</button>
            </div>
            
        </>
    );
};

export default RealizarExamen;
