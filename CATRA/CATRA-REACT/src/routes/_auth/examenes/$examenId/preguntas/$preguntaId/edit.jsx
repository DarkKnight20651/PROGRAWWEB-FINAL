import { createFileRoute } from '@tanstack/react-router'
import PreguntaEdit from 'src/pages/preguntas/PreguntaEdit'

export const Route = createFileRoute(
    '/_auth/examenes/$examenId/preguntas/$preguntaId/edit',
)({
    component: PreguntaEdit,
})