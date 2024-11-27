import { createFileRoute } from '@tanstack/react-router'
import ExamenIndex from 'src/pages/examenes/ExamenIndex'

export const Route = createFileRoute('/_auth/examenes/')({
    component: ExamenIndex,
})