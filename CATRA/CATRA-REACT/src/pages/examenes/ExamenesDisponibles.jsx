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
            <h1>Examenes Disponibles</h1>
            <div className="container">
                {examenes.map(examen => (
                    <div className="card" key={examen.id}>
                        <div className="card-content">
                            <div className="card-info">
                                <h3>Nombre del Examen:{examen.examen.nombre}</h3>
                                <p><strong>Categoria:</strong> {examen.examen.id_Infocurso}</p>
                                <p><strong>Periodo:</strong>  {getTipoExamen(examen.examen.tipo)}</p>
                                <p><strong>Descripción:</strong> {examen.examen.descripcion}</p>
                                <p><strong>Disponible Hasta:</strong> {examen.fecha_fin_asignado}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => realizar(examen.examen.id)} className="edit">Realizar Examen</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamenesDisponibles;
