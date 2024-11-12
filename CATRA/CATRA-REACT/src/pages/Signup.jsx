import { useState,createRef } from 'react';
import { Link } from 'react-router-dom';
import {useStateContext} from "/src/contexts/ContextProvider.jsx";
import axiosClient from "/src/axios-client.jsx"

const Signup = () => {
  const nameRef = createRef()
  const apep = createRef()
  const apem = createRef()
  const fechaNac = createRef()
  const emailRef = createRef()
  const tel = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)
  

  const onSubmit = ev => {
    ev.preventDefault();
    const payload = {
        name: nameRef.current.value,
        apellidop: apep.current.value,
        apellidom: apem.current.value,
        dateBirth: fechaNac.current.value,
        email: emailRef.current.value,
        tel: tel.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      }
      
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 w-50"> 
      <h3 className="text-center">Registrarse</h3><br></br>
      <form onSubmit={onSubmit}>
        
      </form>
    </div>
  </div>
  
  );
};

export default Signup;
