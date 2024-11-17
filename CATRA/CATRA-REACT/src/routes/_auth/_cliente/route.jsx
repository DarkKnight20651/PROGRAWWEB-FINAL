import { createFileRoute } from '@tanstack/react-router'

import { fallback } from '/src/auth-utils.js'
import roleGuard from '../../../util/roleGuard';

export const Route = createFileRoute('/_auth/_cliente')({
  beforeLoad: async ({ context }) => {
    console.log('CONTEXTO BEFORE LOAD /_AUTH/_CLIENT', context)
    roleGuard(context, ["cliente"], fallback);
  },
})
