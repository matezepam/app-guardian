import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Droplets, Zap, Trash2, Plus, Calendar, Activity, Leaf } from 'lucide-react';

const COLORS = ['#3b82f6', '#eab308', '#22c55e'];

const TIPS = [
  { title: 'Ahorra Agua', text: 'Cierra el grifo mientras te cepillas los dientes. Puedes ahorrar hasta 4 litros por minuto.', icon: Droplets, bg: 'bg-blue-50', color: 'text-blue-500' },
  { title: 'Apaga las Luces', text: 'Aprovecha la luz natural y apaga las luces cuando salgas de una habitación.', icon: Zap, bg: 'bg-yellow-50', color: 'text-yellow-500' },
  { title: 'Reduce Plásticos', text: 'Lleva tu propia bolsa al supermercado y evita comprar productos con exceso de embalaje.', icon: Trash2, bg: 'bg-green-50', color: 'text-green-500' }
];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ type: 'water', amount: '', date: new Date().toISOString().split('T')[0] });
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    setLoading(true);
    const res = await api.get('/expenses');
    if (res.data) setExpenses(res.data);
    else if (res.error) setError(res.error.message || 'Error al cargar');
    setLoading(false);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.date) return;

    try {
      const payload = { data: { type: formData.type, amount: parseFloat(formData.amount), date: formData.date } };
      const res = await api.post('/expenses', payload);
      if (res.error) setError(res.error.message || 'Error al guardar');
      else {
        setFormData({ ...formData, amount: '' });
        setError('');
        fetchExpenses();
      }
    } catch (err) {
      console.error("Error saving expense:", err);
      setError('Error al conectar con el servidor');
    }
  };

  const calculateTotal = (type) =>
    expenses.filter(e => e.type === type).reduce((sum, e) => sum + Number(e.amount), 0);

  const chartData = [
    { name: 'Agua (L)', value: calculateTotal('water') },
    { name: 'Luz (kWh)', value: calculateTotal('light') },
    { name: 'Plástico (kg)', value: calculateTotal('plastic') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" alt="Dashboard Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-teal-900/70 backdrop-blur-[1px]"></div>
          </div>
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Panel de Control</h1>
              <p className="text-green-100 text-lg opacity-90">Bienvenido de nuevo, aquí tienes el resumen de tu impacto.</p>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-green-900 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20">
              <Calendar className="h-5 w-5 text-green-600" />
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          {error}
        </div>}

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Agua Total</p>
              <h3 className="text-4xl font-bold text-gray-900">{calculateTotal('water')} <span className="text-lg font-medium text-gray-400">L</span></h3>
            </div>
            <div className="relative z-10 bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30 text-white">
              <Droplets className="h-6 w-6" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Luz Total</p>
              <h3 className="text-4xl font-bold text-gray-900">{calculateTotal('light')} <span className="text-lg font-medium text-gray-400">kWh</span></h3>
            </div>
            <div className="relative z-10 bg-gradient-to-br from-yellow-400 to-amber-500 p-4 rounded-2xl shadow-lg shadow-yellow-500/30 text-white">
              <Zap className="h-6 w-6" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Plástico Total</p>
              <h3 className="text-4xl font-bold text-gray-900">{calculateTotal('plastic')} <span className="text-lg font-medium text-gray-400">kg</span></h3>
            </div>
            <div className="relative z-10 bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl shadow-lg shadow-green-500/30 text-white">
              <Trash2 className="h-6 w-6" />
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Activity className="h-5 w-5 text-indigo-600" />
                  </div>
                  Consumo por Tipo
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f9fafb' }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  Distribución
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Historial Reciente</h3>
              {loading ? (
                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-100">
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider pl-4">Fecha</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {expenses.slice(0, 10).map(exp => (
                        <tr key={exp._id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 pl-4 text-sm font-medium text-gray-600">{new Date(exp.date).toLocaleDateString()}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize shadow-sm
                              ${exp.type==='water'?'bg-blue-50 text-blue-600 border border-blue-100':
                                exp.type==='light'?'bg-yellow-50 text-yellow-600 border border-yellow-100':
                                'bg-green-50 text-green-600 border border-green-100'}`}>
                              {exp.type==='water'?'💧 Agua':exp.type==='light'?'⚡ Luz':'♻️ Plástico'}
                            </span>
                          </td>
                          <td className="py-4 text-sm font-bold text-gray-900">{exp.amount}</td>
                        </tr>
                      ))}
                      {expenses.length===0 && (
                        <tr>
                          <td colSpan="3" className="py-12 text-center text-gray-400">
                            <p>No hay registros aún.</p>
                            <p className="text-sm mt-2">¡Comienza a registrar tu consumo!</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-white p-8 rounded-3xl shadow-lg shadow-green-900/5 border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-teal-500"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl text-green-600">
                  <Plus className="h-6 w-6" />
                </div>
                Nuevo Registro
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Consumo</label>
                  <div className="relative">
                    <select className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition-all appearance-none font-medium text-gray-700 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="water">💧 Agua (Litros)</option>
                      <option value="light">⚡ Luz (kWh)</option>
                      <option value="plastic">♻️ Plástico (kg)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Cantidad</label>
                  <input type="number" step="0.01" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition-all outline-none font-medium text-gray-700" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fecha</label>
                  <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition-all outline-none font-medium text-gray-700" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                </div>
                <button type="submit" className="w-full py-3 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors">Guardar</button>
              </form>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
