import { useState } from 'react';
import { Link, useNavigate, useRouter, useRouterState } from '@tanstack/react-router';
import axiosClient from 'src/axios-client';
import RegistrarClienteSubmit from 'src/components/user/RegistrarClienteSubmit';
import ClienteForm from 'src/components/user/ClienteForm';

const ClientesCreate = () => {
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

      const resultado = await axiosClient.post("/clientes", payload);

      if (resultado === "Success") {
        alert("El cliente se creo correctamente");
        await router.invalidate();
        await navigate({ to: "/clientes" });
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
    <ClienteForm
      title={'Crear nuevo cliente'}
      formData={formData}
      setFormData={setFormData}
      onFormSubmit={onFormSubmit}
      isRegistering={isRegistering}
      errors={errors}
      SubmitComponent={<RegistrarClienteSubmit />} />
  );
}
export default ClientesCreate;