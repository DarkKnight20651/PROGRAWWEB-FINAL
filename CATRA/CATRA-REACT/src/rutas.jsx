import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import ExamenCreate from "./pages/examenes/ExamenCreate";
import ExamenEdit from "./pages/examenes/ExamenEdit";
import ExamenIndex from "./pages/examenes/ExamenIndex";

import PreguntaCreate from "./pages/preguntas/PreguntaCreate";
import PreguntaEdit from "./pages/preguntas/PreguntaEdit";
import PreguntaIndex from "./pages/preguntas/PreguntaIndex";

import RespuestaCreate from "./pages/respuestas/RespuestaCreate";
import RespuestaEdit from "./pages/respuestas/RespuestaEdit";
import RespuestaIndex from "./pages/respuestas/RespuestaIndex";
const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/examenes',
                element: <ExamenIndex />
            },
            {
                path: '/examenes/create',
                element: <ExamenCreate />
            },
            {
                path: '/examenes/:examenId/edit',
                element: <ExamenEdit />
            },

            /* {
                path: '/examenes/asignaciones/:userId',
                element: <ExamenesDisponibles />
            }, */
            /* {
                path: '/examenes/realizar/:id',
                element: <RealizarExamen />
            }, */

            //

            {
                path: '/examenes/:examenId/preguntas',
                element: <PreguntaIndex />
            },
            {
                path: '/examenes/:examenId/preguntas/create',
                element: <PreguntaCreate />
            },
            {
                path: '/examenes/:examenId/preguntas/:preguntaId/edit',
                element: <PreguntaEdit />
            },

            //

            {
                path: '/examenes/:examenId/preguntas/:preguntaId/respuestas',
                element: <RespuestaIndex />
            },
            {
                path: '/examenes/:examenId/preguntas/:preguntaId/respuestas/create',
                element: <RespuestaCreate />
            },
            {
                path: '/examenes/:examenId/preguntas/:preguntaId/respuestas/:respuestaId/edit',
                element: <RespuestaEdit />
            },
        ]
    },
]);

export default router;
