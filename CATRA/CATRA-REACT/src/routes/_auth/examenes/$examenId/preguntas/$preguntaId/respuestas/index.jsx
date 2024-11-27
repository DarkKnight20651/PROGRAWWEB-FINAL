import { createFileRoute } from '@tanstack/react-router'
import RespuestaIndex from 'src/pages/respuestas/RespuestaIndex'

export const Route = createFileRoute(
    '/_auth/examenes/$examenId/preguntas/$preguntaId/respuestas/',
)({
    component: RespuestaIndex,
})