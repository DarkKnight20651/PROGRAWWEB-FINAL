import { createFileRoute, useNavigate, useRouter, useRouterState } from '@tanstack/react-router';
import useAuth from 'src/useAuth'
import { useState } from 'react';

import 'src/styles/index.css'
import 'src/assets/bootstrap.min.css'
import 'src/pages/signup/Signup.css'

import { fallback } from 'src/auth-utils'
import guestGuard from 'src/util/guestGuard';
import UserForm from 'src/components/user/UserForm';
import RegisterUserSubmit from 'src/components/user/RegisterUserSubmit';

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context }) => {
    guestGuard(context, fallback);
  },
  component: SignupComponent,
});

// eslint-disable-next-line no-unused-vars
const fakeData = {
  nombre: "a",
  ape_p: "a",
  ape_m: "a",
  curp: "a",
  fecha_nac: "2024-11-16",
  genero: 1,
  email: "a@gmail.com",
  telefono: "1",
  password: "12345678",
  password_confirmation: "12345678",
};

function SignupComponent() {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    ape_p: "",
    ape_m: "",
    curp: "",
    fecha_nac: "",
    genero: 1,
    email: "",
    telefono: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };

      const resultado = await auth.signup(payload);

      if (resultado === "Success") {
        await router.invalidate();
        await navigate({ to: "/dashboard" });
      }
    } catch (error) {
      console.log("ERROR SIGNUP - ", error);
      setErrors(() => error.mensajes || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegistering = isLoading || isSubmitting;

  return (
    <UserForm
      title={'Registrarse'}
      formData={formData}
      setFormData={setFormData}
      onFormSubmit={onFormSubmit}
      isRegistering={isRegistering}
      errors={errors}
      SubmitComponent={<RegisterUserSubmit />} />
  );
}