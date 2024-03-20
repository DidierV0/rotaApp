import React, { useState } from 'react'
import Header from '../common/Header'
import { loginByEmail } from "../../services/commonjs/auth"
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialise les erreurs précédentes
    try {
      await loginByEmail(email, password);
      navigate('/')
      // Connexion réussie, vous pouvez rediriger l'utilisateur ou gérer l'état connecté
    } catch (error) {
      setError('Échec de la connexion. Vérifiez votre email et mot de passe.');
      console.error(error);
    }
  };

  return (
    <div className=' h-screen w-screen flex flex-col justify-center items-center'>

      <Header/>

      <div className="flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="exemple@domaine.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>

      
    </div>
  )
}

export default Login