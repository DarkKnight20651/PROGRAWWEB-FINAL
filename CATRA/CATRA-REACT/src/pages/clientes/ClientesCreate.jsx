import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import axiosClient from 'src/axios-client';
import ClienteForm from 'src/components/cliente/ClienteForm';
import RegistrarClienteSubmit from 'src/components/cliente/RegistrarClienteSubmit';

/* const fechaActual = new Date();
const dia = String(fechaActual.getDate()).padStart(2, '0');
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); */

const ClientesCreate = () => {
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
                setErrors({});
                alert("El cliente se creo correctamente");
                //await router.invalidate();
                await navigate({ to: "/clientes" });
            }
        } catch (error) {
            if (error.response?.data?.errors) setErrors(() => error.response.data.errors);
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isRegistering = isLoading || isSubmitting;

    return (
        <div>
            <ClienteForm
                title={'Crear nuevo cliente'}
                formData={formData}
                setFormData={setFormData}
                onFormSubmit={onFormSubmit}
                isRegistering={isRegistering}
                /* errors={errors} */
                SubmitComponent={<RegistrarClienteSubmit />} />
        </div>
    );
}
export default ClientesCreate;