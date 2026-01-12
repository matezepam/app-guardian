import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplets,
  Zap,
  Leaf,
  Recycle,
  Globe,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  const pillars = [
    {
      icon: <Droplets className="h-6 w-6 text-blue-600" />,
      title: "Uso Responsable del Agua",
      text: "Comprende cuánta agua consumes, detecta excesos y fomenta hábitos responsables en tu entorno.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1200",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Energía Consciente",
      text: "Reduce emisiones y costos energéticos con información clara y accionable.",
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&q=80&w=1200",
    },
    {
      icon: <Recycle className="h-6 w-6 text-green-600" />,
      title: "Gestión de Residuos",
      text: "Identifica tu huella de desechos y participa activamente en la economía circular.",
      image:
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  const actions = [
    {
      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
      title: "Hábitos sostenibles",
      text: "Pequeñas decisiones diarias generan grandes cambios a largo plazo.",
    },
    {
      icon: <Globe className="h-6 w-6 text-emerald-600" />,
      title: "Impacto global",
      text: "Tus acciones locales contribuyen a un planeta más saludable.",
    },
    {
      icon: <Recycle className="h-6 w-6 text-emerald-600" />,
      title: "Economía circular",
      text: "Reduce, reutiliza y recicla con conciencia.",
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=2000"
            alt="Environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-6 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
              Tecnología para un futuro sostenible
            </span>

            <h1 className="text-5xl xl:text-6xl font-extrabold text-white mb-6">
              Protege el planeta
              <br />
              <span className="text-emerald-400">con información real</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl mb-10">
              Guardian te permite medir, analizar y mejorar tu impacto ambiental
              con datos claros y decisiones conscientes.
            </p>

            <div className="flex gap-4 flex-wrap">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 transition"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Ir al Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 transition"
                  >
                    Comenzar ahora
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-7 py-4 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
                  >
                    Iniciar sesión
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=1400"
              alt="Nature"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {pillars.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="rounded-3xl overflow-hidden shadow-lg bg-slate-50"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl font-extrabold mb-4">
            Acciones que construyen el cambio
          </h2>
          <p className="text-lg text-slate-600">
            Cada decisión cuenta cuando se trata del planeta.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {actions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-10 rounded-2xl shadow-md"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-6">
            ¡No heredamos la Tierra, la cuidamos para quienes vienen!
          </h2>
          <p className="text-lg text-emerald-100 mb-10">
          Vivimos en un mundo que necesita más conciencia, más responsabilidad y más acción.
          Guardian nace para acompañarte en ese camino, ayudándote a transformar pequeñas
          decisiones diarias en hábitos sostenibles que generan un impacto positivo en el
          planeta. Cada paso cuenta, y el tuyo puede marcar la diferencia.
          </p>

          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-emerald-700 font-extrabold rounded-xl hover:bg-emerald-50 transition"
            >
              Crear cuenta gratuita
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
