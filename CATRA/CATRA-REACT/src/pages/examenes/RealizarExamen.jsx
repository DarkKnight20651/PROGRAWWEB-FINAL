import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '/src/axios-client.jsx';

const RealizarExamen = () => {
    const [examen, setExamen] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();//id del examen
    //const{curp}=auth.user.cliente.curp;
    const fetchPreguntas = async () => {
        try {
            const response = await axiosClient.get(`examen/${id}/all`);
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


    return (
        <div>
            <h1>Realizando Examen</h1>
            <div className="container">

                {examen.map(examen => (

                    <div key={examen.id}>


                        {examen.preguntas.map(pregunta => (
                            <div className="card" key={pregunta.id}>
                                <div className="card-content">
                                    <div className="card-info">

                                        <h2>Pregunta {count}: {pregunta.texto}</h2>
                                        {inc_count()}
                                        {pregunta.imagen_url ? (
                                            <img
                                                src={pregunta.imagen_url}
                                                alt="Imagen de la respuesta"
                                                style={{ width: '100px', height: 'auto' }}
                                            />

                                        ) : (null)}
                                        {pregunta.respuestas.map((respuesta) => (
                                            <div key={respuesta.id}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`respuesta-${pregunta.id}`}
                                                        value={respuesta.id}
                                                    />
                                                    {respuesta.texto}
                                                    {respuesta.imagen_url ? (
                                                        <img
                                                            src={respuesta.imagen_url}
                                                            alt="Imagen de la respuesta"
                                                            style={{ width: '100px', height: 'auto' }}
                                                        />

                                                    ) : (null)}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="card-actions">

                                    </div>
                                </div>

                            </div>

                        ))}

                    </div>

                ))}
                <button onClick={() => handleEditExamen(examen)} className="edit">Terminar Examen</button>

            </div>
        </div>
    );
};

export default RealizarExamen;
