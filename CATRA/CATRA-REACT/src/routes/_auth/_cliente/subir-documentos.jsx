import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_cliente/subir-documentos')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Página de subir mis documentos</h1>
    </div>
  )
}
