import { createFileRoute } from '@tanstack/react-router';
import ListaCursos from 'src/pages/servicios/ListaCursos';

export const Route = createFileRoute('/_auth/Lista-Cursos')({
  component: ListaCursos,
})