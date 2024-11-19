import { createFileRoute } from '@tanstack/react-router'
import Cursos from "src/pages/servicios/Cursos";

export const Route = createFileRoute('/nuestros-cursos')({
  component: Cursos,
})