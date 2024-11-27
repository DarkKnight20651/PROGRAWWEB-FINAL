import { createFileRoute } from '@tanstack/react-router'
import ClientesEdit from 'src/pages/clientes/ClientesEdit'

export const Route = createFileRoute('/_auth/clientes/editar/$curp')({
    component: ClientesEdit,
})