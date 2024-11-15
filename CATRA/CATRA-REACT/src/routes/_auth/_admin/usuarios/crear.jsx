import { createFileRoute } from '@tanstack/react-router'
import UserCreate from '../../../../pages/users/UserCreate'

export const Route = createFileRoute('/_auth/_admin/usuarios/crear')({
  component: UserCreate,
})