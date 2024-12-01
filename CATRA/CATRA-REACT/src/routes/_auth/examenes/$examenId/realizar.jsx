
import { createFileRoute } from '@tanstack/react-router'
import RealizarExamen from 'src/pages/examenes/RealizarExamen'
export const Route = createFileRoute('/_auth/examenes/$examenId/realizar')({
  component: RealizarExamen,
})


