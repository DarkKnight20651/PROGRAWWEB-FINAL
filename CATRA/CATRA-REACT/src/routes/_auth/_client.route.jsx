import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_client')({
  beforeLoad: async ({ context }) => {
    console.log('CONTEXTO BEFORE LOAD /_AUTH/_CLIENT', context)

    if (!context.auth.isAuthenticated || context.auth.isAdmin) {
      throw redirect({
        to: '/dashboard'
      })
    }
  },
})
