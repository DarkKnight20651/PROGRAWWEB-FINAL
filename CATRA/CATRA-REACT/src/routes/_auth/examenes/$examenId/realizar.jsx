
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/examenes/$examenId/realizar')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/examenes/$examenId/realizar!'
}
