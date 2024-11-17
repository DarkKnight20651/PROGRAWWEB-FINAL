import { createFileRoute } from '@tanstack/react-router'
import UserManager from '/src/pages/clientes/ClientesIndex'

export const Route = createFileRoute('/_auth/clientes/')({
  component: UserManager,
})
