// src/pages/LoginPage.tsx
import React, { useState, FormEvent } from "react";
import { forgot_password } from "../../actions";
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [requestSend, setRequestSend] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      forgot_password(email);
      setRequestSend(true);
      toast.success("Correo enviado exitosamente!");
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar el link de recuperación, intente nuevamente");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p>Ingresa tu email para recuperar tu contraseña:</p>
            <label htmlFor="email" className="block mt-3 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Enviar email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;