import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/routes')({
  beforeLoad: async ({ context, location }) => {
    console.log('CONTEXTO BEFORE LOAD /_AUTH', context)

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteHome,
})

function RouteHome() {
  return <div></div>
}
