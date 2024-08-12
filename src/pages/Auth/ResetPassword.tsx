import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { reset_password } from "../../actions";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Token de recuperación no encontrado");
      return;
    }

    try {
      await reset_password(password, token); // Espera a que la función termine
      toast.success("Se cambió con éxito la contraseña");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al cambiar la contraseña, intente nuevamente");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Recuperar Contraseña</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <p>Ingresa tu nueva contraseña:</p>
            <label htmlFor="password" className="block mt-3 text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;