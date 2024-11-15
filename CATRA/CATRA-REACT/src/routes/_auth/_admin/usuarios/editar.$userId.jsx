import { createFileRoute } from '@tanstack/react-router'
import UserEdit from '../../../../pages/users/UserEdit'

export const Route = createFileRoute('/_auth/_admin/usuarios/editar/$userId')({
  component: UserEdit,
})