import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import useAuth from 'src/useAuth';
import axiosClient from 'src/axios-client.jsx';
import 'src/pages/examenes/ExamenesDisponibles.css';

function ExamenesDisponibles() {
    const [examenes, setExamenes] = useState([]);
    const navigate = useNavigate();

    const auth = useAuth();
    const curp = auth.user?.cliente?.curp;

    console.log(curp);

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
        const fetchExamenes = async () => {
            const response = await axiosClient.get(`/cliente/${curp}/examenes`);
            setExamenes(response.data);
        };
        fetchExamenes();
    }, [curp]);

    const realizar = (id) => {
        navigate({ to: `/examenes/${id}/realizar` });
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>📝 Exámenes Disponibles</h1>
            <div className="container" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {examenes.map((examen) => (
                    <div
                        className="card"
                        key={examen.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div className="card-content">
                            <div className="card-info">
                                <h3 style={{ fontSize: "1.2em", marginBottom: "10px" }}>
                                    <strong>{examen.examen.nombre}</strong>
                                </h3>
                                <p>🎯 <strong>Categoría:</strong> {examen.examen.tipo_licencia}</p>
                                <p>📅 <strong>Periodo:</strong> {examen.examen.tipo}</p>
                                <p>🖊️ <strong>Descripción:</strong> {examen.examen.descripcion}</p>
                                <p>⏳ <strong>Disponible Hasta:</strong> {examen.fecha_fin_asignado}</p>
                                <p>✅ <strong>Estado:</strong> {examen.estado}</p>
                            </div>
                            <div className="card-actions" style={{ marginTop: "15px", textAlign: "center" }}>
                                {examen.estado !== "terminado" && (
                                    <button
                                        onClick={() => realizar(examen.examen.id)}
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            fontSize: "1em",
                                        }}
                                    >
                                        {examen.estado === "asignado" && "Comenzar Examen"}
                                        {examen.estado === "realizando" && "Continuar Examen"}
                                    </button>
                                )}
                                {examen.estado === "terminado"&&(
                                    `Calificacion: ${examen.calificacion}`
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>



    );
};

export default ExamenesDisponibles;
