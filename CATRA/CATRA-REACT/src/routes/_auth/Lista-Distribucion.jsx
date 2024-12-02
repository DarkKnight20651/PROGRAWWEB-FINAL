import { createFileRoute } from '@tanstack/react-router';
import ListaDistribucion from 'src/pages/servicios/ListaDistribucion';

export const Route = createFileRoute('/_auth/Lista-Distribucion')({
  component: ListaDistribucion,
})
