import { createFileRoute } from '@tanstack/react-router';
import SeleccionCursos from 'src/pages/servicios/SeleccionCursos';

export const Route = createFileRoute('/_auth/Seleccion-Curso')({
  component: SeleccionCursos,
})
