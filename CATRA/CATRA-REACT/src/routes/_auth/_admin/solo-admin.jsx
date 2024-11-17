import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_admin/solo-admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Página de solo administradores</h1>
    </div>
  )
}
