import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import SeleccionCursos from 'src/pages/servicios/SeleccionCursos';
export const Route = createFileRoute('/_auth/Seleccion-Curso')({
  component: SeleccionCursos,
})

function RouteComponent() {
  return 'Hello /_auth/Seleccion-Curso!'
}
