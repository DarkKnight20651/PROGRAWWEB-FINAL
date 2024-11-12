import { useAuth } from '../../auth';

const useClient = () => {
  const auth = useAuth(); 

  if (auth.isAdmin === false) {
    console.log('Es cliente');

    return (
        <div>
            <p>Esta ruta es solo para administradores</p>
        </div>
    );
  }
};

export default useClient;
