import { createFileRoute } from '@tanstack/react-router'
import authGuard from '../../util/AuthGuard'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    console.log('CONTEXTO BEFORE LOAD /AUTH', context)
    await authGuard(context, { location, url: '/login' });
  },
})
