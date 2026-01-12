import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { tipDetailData } from "./tipDetailData";

export default function TipDetail() {
  const { slug } = useParams();
  const tip = tipDetailData[slug];

  if (!tip) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Contenido no encontrado
        </h1>
        <Link
          to="/tips"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Volver a tips
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6">

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {tip.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {tip.subtitle}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="mb-20"
        >
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full rounded-3xl shadow-xl"
          />
        </motion.div>

        <div className="space-y-20">
          {tip.sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {section.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            to="/tips"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl transition shadow-md text-center"
          >
            ← Volver a tips
          </Link>

          <Link
            to="/impact"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-2xl transition shadow-md text-center"
          >
            Ver impacto ambiental
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
