
import { createFileRoute } from '@tanstack/react-router'
import { fallback } from 'src/auth-utils';
import ExamenesDisponibles from 'src/pages/examenes/ExamenesDisponibles'
import roleGuard from 'src/util/roleGuard';

export const Route = createFileRoute('/_auth/examenes/disponibles')({
  component: ExamenesDisponibles,
  beforeLoad: async ({ context }) => {
    roleGuard(context, ["cliente"], fallback);
  },
})
