import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_admin')({
    beforeLoad: async ({ context }) => {
        console.log('CONTEXTO BEFORE LOAD /_AUTH/_ADMIN', context)

        if (!context.auth.isAuthenticated || context.auth.rol !== "admin") {
            throw redirect({
                to: '/dashboard'
            })
        }
    },
})