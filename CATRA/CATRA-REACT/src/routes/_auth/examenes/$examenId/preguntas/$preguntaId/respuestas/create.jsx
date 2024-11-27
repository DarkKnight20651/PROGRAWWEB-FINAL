import { createFileRoute } from '@tanstack/react-router'
import RespuestaCreate from 'src/pages/respuestas/RespuestaCreate'

export const Route = createFileRoute(
    '/_auth/examenes/$examenId/preguntas/$preguntaId/respuestas/create',
)({
    component: RespuestaCreate,
})