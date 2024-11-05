import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import App from "./App";
import Infocatra from "./Infocatra";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Students from "./pages/Students";
import AdminLayout from "./components/AdminLayout";
import GuestLayout from "./components/GuestLayout";
const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: '/Students',
                element: <Students></Students>
            },
            {
                path: '/home',
                element: <App></App>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout></GuestLayout>,
        children: [
            {
                path: '/home',
                element: <App></App>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/Infocatra',
                element: <Infocatra></Infocatra>
            }


        ]
    },

    {
        path: '*',
        element: <NotFound></NotFound>
    },
])

export default router;