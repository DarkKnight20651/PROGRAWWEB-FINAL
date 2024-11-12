import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_admin/administrar-clientes')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Página de administrar a los clientes</h1>
    </div>
  )
}
