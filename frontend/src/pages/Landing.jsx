import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplets,
  Zap,
  Trash2,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  const features = [
    {
      icon: <Droplets className="h-6 w-6 text-white" />,
      title: "Control de Agua",
      description:
        "Registra cada litro y descubre patrones de consumo para ahorrar este recurso vital.",
      image:
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
      color: "bg-blue-500",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Eficiencia Energética",
      description:
        "Monitorea tu gasto eléctrico y recibe consejos personalizados para reducir tu factura.",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      color: "bg-yellow-500",
    },
    {
      icon: <Trash2 className="h-6 w-6 text-white" />,
      title: "Reducción de Plásticos",
      description:
        "Visualiza tu huella de residuos y únete al reto de cero desperdicios.",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?auto=format&fit=crop&q=80&w=2000"
            alt="Nature Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Tu compañero ecológico personal
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
              Pequeños cambios,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300">
                gran impacto.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-200 mb-12">
              EcoGuardian te ayuda a medir, entender y reducir tu impacto
              ambiental. Cambia el mundo desde casa.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-green-900 bg-green-400 hover:bg-green-300 transition-all shadow-lg"
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Ir a mi Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-green-900 bg-green-400 hover:bg-green-300 transition-all shadow-lg"
                  >
                    Comenzar Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white border-2 border-white/30 hover:bg-white/10 transition-all"
                  >
                    Ya tengo cuenta
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para ser sostenible
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Herramientas simples y poderosas para tu día a día.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-8">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
