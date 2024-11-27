import { createFileRoute } from '@tanstack/react-router'
import ExamenCreate from 'src/pages/examenes/ExamenCreate'

export const Route = createFileRoute('/_auth/examenes/create')({
    component: ExamenCreate,
})
