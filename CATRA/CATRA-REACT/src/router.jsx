import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Students from "./pages/Students";
import AdminLayout from "./components/AdminLayout";
import GuestLayout from "./components/GuestLayout";
const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout></AdminLayout>,
        children:[
            {
                path: '/Students',
                element: <Students></Students>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout></GuestLayout>,
        children:[
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
        ]
    },

{
    path: '*',
    element: <NotFound></NotFound>
},
])

export default router;