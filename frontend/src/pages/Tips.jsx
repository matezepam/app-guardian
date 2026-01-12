import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { tipsWithSlug } from "./Tips/tipsData";

export default function Tips() {
  return (
    <section className="pt-28 pb-32 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-28"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Tips para Cuidar el Medio Ambiente 🌱
          </h1>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Descubre cómo pequeñas acciones diarias pueden generar un gran impacto positivo en nuestro planeta. Aprende, aplica y comparte cada tip para que tu entorno se vuelva más sostenible.
          </p>
        </motion.div>

        <div className="space-y-24">
          {tipsWithSlug.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden hover:shadow-emerald-300 transition-transform transform hover:-translate-y-1 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/3 flex justify-center items-center p-6 bg-green-50">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 p-8 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="text-emerald-500 text-5xl font-bold mt-1">●</div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">{tip.title}</h2>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">
                        {tip.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-emerald-500">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Puntos clave</h3>
                    <ul className="space-y-2 text-gray-700 list-none">
                      {tip.description.split(". ").map((sentence, idx) =>
                        sentence.trim() ? (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold mt-1">●</span>
                            <span>{sentence.replace(/\.$/, "")}.</span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center mt-3">
                  <Link
                    to={`/tips/${tip.slug}`}
                    className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-7 rounded-2xl shadow-md transition-transform transform hover:-translate-y-1"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              ¡Tú puedes marcar la diferencia!
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
              Implementa estos tips y motiva a tu comunidad a hacer lo mismo. Cada acción, por pequeña que parezca, contribuye a un planeta más limpio y saludable. ♻️  
              Aprende, comparte y observa el cambio que juntos podemos generar.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
