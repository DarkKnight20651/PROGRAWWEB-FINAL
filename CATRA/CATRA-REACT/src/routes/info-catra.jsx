import { createFileRoute } from '@tanstack/react-router'
import Infocatra from "../otros/Infocatra"

export const Route = createFileRoute('/info-catra')({
  component: Infocatra,
})