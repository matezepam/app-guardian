import { useParams, Link } from "react-router-dom";
import { tipsWithSlug } from "./tipsData";
import { motion } from "framer-motion";

export default function TipPost() {
  const { slug } = useParams();
  const tip = tipsWithSlug.find(t => t.slug === slug);

  if (!tip) {
    return (
      <div className="pt-24 text-center">
        <h1 className="text-2xl font-bold">Tip no encontrado</h1>
        <Link to="/tips" className="text-green-600 underline mt-4 inline-block">Volver a Tips</Link>
      </div>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
        >
          <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-green-200">
            <img
              src={tip.image}
              alt={tip.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{tip.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">● {tip.description}</p>

          <Link
            to="/tips"
            className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
          >
            Volver a Tips
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
