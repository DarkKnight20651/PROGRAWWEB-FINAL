import { useAuth } from '../../auth';

const useAdmin = () => {
  const auth = useAuth(); 

  if (auth.isAdmin === true) {
    console.log('Es admin');
    
    return (
        <div>
            <p>Esta ruta es solo para administradores</p>
        </div>
    );
  }
};

export default useAdmin;
