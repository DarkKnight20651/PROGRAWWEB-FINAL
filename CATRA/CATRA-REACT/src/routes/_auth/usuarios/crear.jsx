import { createFileRoute } from '@tanstack/react-router'
import UserCreate from '/src/pages/users/UserCreate'

export const Route = createFileRoute('/_auth/usuarios/crear')({
  component: UserCreate,
})
