import { createFileRoute } from '@tanstack/react-router'

import { fallback } from 'src/auth-utils.js'
import roleGuard from 'src/util/roleGuard';

export const Route = createFileRoute('/_auth/usuarios')({
  beforeLoad: async ({ context }) => {
    console.log('CONTEXTO BEFORE LOAD /_AUTH/usuarios', context)
    roleGuard(context, ["admin", "secre"], fallback);
  },
})
