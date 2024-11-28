
import { createFileRoute } from '@tanstack/react-router'
import ExamenesDisponibles from 'src/pages/examenes/ExamenesDisponibles'
export const Route = createFileRoute('/_auth/examenes/disponibles')({
  component: ExamenesDisponibles,
})


