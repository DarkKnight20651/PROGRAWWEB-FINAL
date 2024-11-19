import { createFileRoute } from '@tanstack/react-router'
import ClientesCreate from 'src/pages/clientes/ClientesCreate'

export const Route = createFileRoute('/_auth/clientes/crear')({
  component: ClientesCreate,
})
