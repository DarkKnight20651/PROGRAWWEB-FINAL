import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
function AdminLayout() {
  const {user,token}=useStateContext()
  //if(!token){
    //return <Navigate to="/login"/>
  //}
  return (
    <div><Outlet /></div>
    
  )
  }
  
  export default AdminLayout;