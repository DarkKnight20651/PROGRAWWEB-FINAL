import { createFileRoute } from '@tanstack/react-router'
import PreguntaCreate from 'src/pages/preguntas/PreguntaCreate'

export const Route = createFileRoute(
    '/_auth/examenes/$examenId/preguntas/create',
)({
    component: PreguntaCreate,
})

