import { createFileRoute } from '@tanstack/react-router'
import UserEdit from 'src/pages/users/UserEdit'

export const Route = createFileRoute('/_auth/usuarios/editar/$userId')({
  component: UserEdit,
})
