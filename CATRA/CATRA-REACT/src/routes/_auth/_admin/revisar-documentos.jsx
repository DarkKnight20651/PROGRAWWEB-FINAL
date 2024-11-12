import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_admin/revisar-documentos')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Página de revisión de documentos de los clientes</h1>
    </div>
  )
}
