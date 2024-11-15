import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import UserManager from '../../../../pages/users/UserIndex'

export const Route = createFileRoute('/_auth/_admin/usuarios/')({
  component: UserManager,
})

