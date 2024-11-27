import { createFileRoute } from '@tanstack/react-router'
import PreguntaIndex from 'src/pages/preguntas/PreguntaIndex'

export const Route = createFileRoute('/_auth/examenes/$examenId/preguntas/')({
    component: PreguntaIndex,
})

