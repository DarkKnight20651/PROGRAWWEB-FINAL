import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_cliente')({
  beforeLoad: async ({ context }) => {
    console.log('CONTEXTO BEFORE LOAD /_AUTH/_CLIENT', context)

    if (!context.auth.isAuthenticated || context.auth.rol !== 'cliente') {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
})
