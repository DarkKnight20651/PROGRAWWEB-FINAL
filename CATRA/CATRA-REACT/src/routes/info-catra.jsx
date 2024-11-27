import { createFileRoute } from '@tanstack/react-router'
import Infocatra from "src/otros/Infocatra"

export const Route = createFileRoute('/info-catra')({
  component: Infocatra,
})