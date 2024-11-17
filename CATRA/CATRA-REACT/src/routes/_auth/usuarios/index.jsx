import { createFileRoute } from '@tanstack/react-router'
import UserManager from '/src/pages/users/UserIndex'

export const Route = createFileRoute('/_auth/usuarios/')({
  component: UserManager,
})
