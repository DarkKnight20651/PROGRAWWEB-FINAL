import { createFileRoute } from '@tanstack/react-router'
import ExamenEdit from 'src/pages/examenes/ExamenEdit'

export const Route = createFileRoute('/_auth/examenes/$examenId/edit')({
    component: ExamenEdit,
})
