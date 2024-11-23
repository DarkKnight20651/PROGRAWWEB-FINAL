import { createFileRoute } from '@tanstack/react-router'
import RespuestaEdit from 'src/pages/respuestas/RespuestaEdit'

export const Route = createFileRoute(
    '/_auth/examenes/$examenId/preguntas/$preguntaId/respuestas/$respuestaId/edit',
)({
    component: RespuestaEdit,
})