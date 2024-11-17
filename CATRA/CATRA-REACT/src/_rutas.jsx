import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import Cursos from "./pages/servicios/Cursos";
import Infocatra from "./Infocatra";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Students from "./pages/Students";
import UserManager from "./pages/users/UserIndex";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit"; 
import ClientesIndex from "./pages/clientes/ClientesIndex";
import ClientesCreate from "./pages/clientes/ClientesCreate";
import ClientesEdit from "./pages/clientes/ClientesEdit"; // Agregar la vista de edición de usuario
import AdminLayout from "./components/AdminLayout";
import GuestLayout from "./components/GuestLayout";
import Evaluaciones from "./evaluaciones";
import Crud from "./crud";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/students',
                element: <Students />
            },
            {
                path: '/users',
                element: <UserManager />
            },
            {
                path: '/users/create',
                element: <UserCreate />
            },
            {
                path: '/users/edit/:id', // Ruta para editar un usuario específico
                element: <UserEdit />
            },
            {
                path: '/clientes',
                element: <ClientesIndex />
            },
            {
                path: '/clientes/create',
                element: <ClientesCreate />
            },
            {
                path: '/clientes/edit/:curp', // Ruta para editar un usuario específico
                element: <ClientesEdit />
            },
            
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/infocatra',
                element: <Infocatra />
            },
            {
                path: '/evaluaciones',
                element: <Evaluaciones />
            },
            {
                path: '/crud',
                element: <Crud />
            },
            {
                path: '/cursos',
                element: <Cursos />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
