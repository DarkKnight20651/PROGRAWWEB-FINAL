import { createFileRoute } from '@tanstack/react-router'
import useAuth from '../../useAuth'
import AdminLayout from '../../components/AdminLayout'
import ClientLayout from '../../components/ClientLayout'

export const Route = createFileRoute('/_auth/dashboard')({
    component: DashboardPage, 
})

function DashboardPage() {
    const auth = useAuth()

    if(auth.isAdmin) {
        return <AdminLayout />
    } else {
        return <ClientLayout />
    }
}