import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import '../assets/bootstrap.min.css';
import '../styles/index.css';
import useAuth from '../useAuth';

import ClienteForm from 'src/components/cliente/ClienteForm';
import RegistrarClienteSubmit from 'src/components/cliente/RegistrarClienteSubmit';
import guestGuard from '../util/guestGuard';
import './Signup.css';
import { fallback } from 'src/auth-utils';

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context }) => {
    guestGuard(context, fallback);
  },
  component: SignupComponent,
});

/* const fechaActual = new Date();
const dia = String(fechaActual.getDate()).padStart(2, '0');
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); */

function SignupComponent() {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    ape_p: "",
    ape_m: "",
    curp: "",
    fecha_nac: "1990-10-15",
    genero: 1,
    email: "",
    telefono: "",
    password: "",
    password_confirmation: "",
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const payload = { ...formData };

      const resultado = await auth.signup(payload);

      if (resultado === "Success") {
        await router.invalidate();
        await navigate({ to: "/dashboard" });
      }
    } catch (error) {
      console.log("Error al registrarse", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegistering = isLoading || isSubmitting;

  return (
    <ClienteForm
      title={'Registrarse'}
      formData={formData}
      setFormData={setFormData}
      onFormSubmit={onFormSubmit}
      isRegistering={isRegistering}
      SubmitComponent={<RegistrarClienteSubmit />} />
  );
}

export default SignupComponent;