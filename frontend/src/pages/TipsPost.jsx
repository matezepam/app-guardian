import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tips } from "../Tips/tipsData";

export default function TipsPost() {
  const { slug } = useParams();
  const tip = tips.find(t => t.slug === slug);

  if (!tip) return <Navigate to="/tips" />;

  return (
    <section className="pt-28 pb-32 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-3xl mx-auto px-6">

        <motion.img
          src={tip.image}
          alt={tip.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-80 object-cover rounded-3xl mb-12"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6 leading-tight"
        >
          {tip.title}
        </motion.h1>

        <p className="text-slate-400 text-lg mb-12 leading-relaxed">
          {tip.summary}
        </p>

        <div className="space-y-14">
          {tip.content.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
                {section.heading}
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">
            Puntos clave
          </h3>
          <ul className="space-y-2 text-slate-300">
            {tip.bullets.map((point, i) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
