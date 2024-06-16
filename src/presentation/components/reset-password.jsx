import { useContext, useEffect, useState } from 'react';
import Home from "../assets/home/home.jpg";
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../infraestructure';
import { Navigate } from 'react-router-dom';
import { ErrorContext } from '../context/error';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updateError } = useContext(ErrorContext);
  const [error, setError] = useState(null);

  const fetchData = useMutation({ mutationFn: (password) => AuthService.sendNewPassword({ password }) });

  useEffect(() => {
    if (fetchData.isError) updateError(fetchData.error.message);
  }, [fetchData.isError]);

  useEffect(() => {
    if (error) updateError(error);
  }, [error]);

  const handleResetPassword = async (e) => {
    setError(null);
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    fetchData.mutate(password);
  };

  if (fetchData.isSuccess) return <Navigate to="/" />;

  return (
    <div className="flex items-center justify-center flex-grow bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-full sm:max-w-md" style={{ maxWidth: '400px', margin: 'auto', width: '90%' }}>
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <h2 className="text-gray-900 text-3xl text-center mb-6">Coloque su nueva Contraseña</h2>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-900 mb-2">Nueva Contraseña</label>
            <input type="password" id="password" className="p-3 rounded bg-gray-200 w-full" placeholder="Colocar Nueva Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-900 mb-2">Confirme su contraseña</label>
            <input type="password" id="confirmPassword" className="p-3 rounded bg-gray-200 w-full" placeholder="Confirme su nueva Contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="mt-4 bg-[#522B46] hover:bg-[#522B46] text-white py-2 px-4 rounded transition ease-in-out duration-300">
              Restablecer Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
