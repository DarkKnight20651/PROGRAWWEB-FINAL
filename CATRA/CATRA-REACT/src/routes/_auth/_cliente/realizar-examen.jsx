import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_cliente/realizar-examen')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Página de realizar un examen</h1>
    </div>
  )
}
