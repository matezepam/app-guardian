import { useEffect, useState } from "react";
import { BarChart3, Database, FileText } from "lucide-react";

export default function Reports() {
  const [resumen, setResumen] = useState({
    totalGastos: 0,
    totalReportes: 0,
    ultimaActualizacion: "-"
  });

  const [detalles, setDetalles] = useState({
    agua: 0,
    luz: 0,
    plastico: 0
  });

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/reports', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error al obtener reportes');

        const agua = data.data.reduce((sum, r) => sum + Number(r.water_total), 0);
        const luz = data.data.reduce((sum, r) => sum + Number(r.light_total), 0);
        const plastico = data.data.reduce((sum, r) => sum + Number(r.plastic_total), 0);
        const totalGastos = agua + luz + plastico;
        const totalReportes = data.data.length;
        const ultimaActualizacion = data.data.length
          ? new Date(data.data[0].created_at).toLocaleDateString()
          : "-";

        setResumen({ totalGastos, totalReportes, ultimaActualizacion });
        setDetalles({ agua, luz, plastico });
      } catch (err) {
        console.error(err);
      }
    };

    obtenerReportes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="text-emerald-400" />
        Reportes y Resumen
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Database className="text-cyan-400" />
            <span className="text-sm text-slate-400">Gastos Totales</span>
          </div>
          <p className="text-2xl font-bold">${resumen.totalGastos}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-violet-400" />
            <span className="text-sm text-slate-400">Reportes Generados</span>
          </div>
          <p className="text-2xl font-bold">{resumen.totalReportes}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-emerald-400" />
            <span className="text-sm text-slate-400">Última Actualización</span>
          </div>
          <p className="text-xl font-semibold">{resumen.ultimaActualizacion}</p>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Por Sección</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl text-center">
            <span className="text-slate-400 block mb-2">Agua</span>
            <p className="text-2xl font-bold">${detalles.agua}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl text-center">
            <span className="text-slate-400 block mb-2">Luz</span>
            <p className="text-2xl font-bold">${detalles.luz}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl text-center">
            <span className="text-slate-400 block mb-2">Plástico</span>
            <p className="text-2xl font-bold">${detalles.plastico}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Resumen General</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Esta sección muestra los totales por categoría, usando los reportes almacenados en PostgreSQL.
          MongoDB sigue manejando los datos principales de la aplicación.
        </p>
      </div>
    </div>
  );
}
