import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router'
import axiosClient from '/src/axios-client.jsx';
import '/src/pages/examenes/ExamenesDisponibles.css';
import useAuth from 'src/useAuth'
function ExamenesDisponibles() {
    const [examenes, setExamenes] = useState([]);
    const navigate = useNavigate();
    const curp = useAuth().cliente.curp;

    const fetchExamenes = async () => {
        const response = await axiosClient.get(`/cliente/${curp}/examenes`);
        setExamenes(response.data);

    };
    const getTipoExamen = (tipo) => {
        switch (tipo) {
            case "1":
                return "Inicial";
            case "2":
                return "Intermedio";
            case "3":
                return "Final";
            default:
                return "Desconocido";
        }
    }
    useEffect(() => {
        fetchExamenes();
    }, []);
    const realizar = async (id) => {
        const payload = {
            curp: curp,
            examenId: id,

        };
        try {
            await axiosClient.post('/examenes/comenzar', payload);

            await navigate({ to: `/examenes/${id}/realizar` });
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="exam-container">
            <h1 className="header">📋 Exámenes Disponibles</h1>
            <div className="cards-container">
                {examenes.map((examen) => (
                    <div className="card" key={examen.id}>
                        <div className="card-header">
                            <h3 className="exam-name">📘 {examen.examen.nombre}</h3>
                        </div>
                        <div className="card-body">
                            <p><strong>📂 Categoría:</strong> {examen.examen.tipo_licencia}</p>
                            <p><strong>⏳ Periodo:</strong> {examen.examen.tipo}</p>
                            <p><strong>📝 Descripción:</strong> {examen.examen.descripcion}</p>
                            <p><strong>📅 Disponible Hasta:</strong> {examen.fecha_fin_asignado}</p>
                        </div>
                        <div className="card-footer">
                            <button onClick={() => realizar(examen.examen.id)} className="button">
                                <i className="fas fa-play-circle"></i> Realizar Examen
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default ExamenesDisponibles;
