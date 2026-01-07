import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = await api.post('/auth/local', { identifier, password });
      
      if (data.error) {
        setError('Credenciales incorrectas o error en el servidor');
      } else if (data.jwt && data.user) {
        login(data.user, data.jwt);
        navigate('/dashboard');
      }
    } catch {
      setError('Error de conexión');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497250681960-ef048c0ab947?auto=format&fit=crop&q=80&w=1200" 
          alt="Nature" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-white text-center p-12 max-w-xl">
            <h2 className="text-4xl font-bold mb-6">Bienvenido a EcoGuardian</h2>
            <p className="text-xl text-green-50 leading-relaxed">Tu plataforma para monitorear y mejorar tu impacto en el medio ambiente. Cada pequeña acción cuenta.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Hola de nuevo! 👋</h2>
            <p className="text-gray-500 text-lg">Ingresa tus datos para continuar</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm mb-8 border border-red-100 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="tu@email.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2 ml-1">
                  <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-green-600/20 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Ingresar <ArrowRight className="h-6 w-6" /></>}
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-500">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="font-bold text-green-600 hover:text-green-700 hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
