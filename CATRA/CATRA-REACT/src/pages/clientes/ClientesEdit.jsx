import { useNavigate, useParams, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client';
import ClienteForm from 'src/components/cliente/ClienteForm';

import 'src/assets/bootstrap.min.css';
import Loader from 'src/components/loader';

export function EditarClienteSubmit() {
    return (<div className="d-grid">
        <button type="submit" className="btn btn-primary">
            Editar
        </button>
    </div>);
}

const getClienteByCurp = async (signal, curp, setFormData, setIsClienteLoading) => {
    let signalError = false;
    try {
        setIsClienteLoading(true);
        const respuesta = await axiosClient.get(`/clientes/${curp}`, signal ? { signal } : {});
        setFormData((p) => ({
            ...p,
            nombre: respuesta.data.nombre,
            ape_p: respuesta.data.ape_p,
            ape_m: respuesta.data.ape_m ?? "",
            curp: respuesta.data.curp,
            fecha_nac: respuesta.data.fecha_nac,
            genero: respuesta.data.genero,
            email: respuesta.data.user.email,
            telefono: respuesta.data.telefono,
        }));
        console.log("informacion obtenida");
    } catch (error) {
        if (error.code === "ERR_CANCELED") signalError = true;
        console.log(error);
    } finally {
        if (!signalError) setIsClienteLoading(false);
    }
}

const UserEdit = () => {
    const { curp } = useParams({ strict: false });
    const isLoading = useRouterState({ select: (s) => s.isLoading });
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClienteLoading, setIsClienteLoading] = useState(true);
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

    useEffect(() => {
        const controller = new AbortController();
        (async () => await getClienteByCurp(controller.signal, curp, setFormData,
            setIsClienteLoading))();
        return () => { controller.abort() };
    }, [curp]);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();
        setIsSubmitting(true);
        try {
            await axiosClient.put(`/clientes/${curp}`, { ...formData });
            alert("Se actualizó correctamente");
            await getClienteByCurp(null, curp, setFormData, setIsClienteLoading);
        } catch (error) {
            console.log(error);
            if (error.response?.data?.errors) setErrors(error.response?.data?.errors);
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelar = async () => {
        await navigate({ to: "/clientes" });
    }

    const isRegistering = isLoading || isSubmitting;

    return (
        <div>
            {isClienteLoading ? (<Loader />) : (
                <>
                    <ClienteForm
                        title={'Editar cliente'}
                        formData={formData}
                        setFormData={setFormData}
                        onFormSubmit={onFormSubmit}
                        isRegistering={isRegistering}
                        /* errors={errors} */
                        SubmitComponent={<EditarClienteSubmit />}
                        isEditing={true}
                    />
                    <p><button className='btn border' onClick={cancelar}>Cancelar</button></p>
                </>
            )}
        </div>
    );
};

export default UserEdit;
