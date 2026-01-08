import { useParams, Link } from 'react-router-dom';
import impactData from './ImpactData';
import { motion } from 'framer-motion';

export default function ImpactPost() {
  const { slug } = useParams();
  const post = impactData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 text-center text-gray-600">
        Post not found
        <div className="mt-4">
          <Link to="/impact" className="text-green-600 hover:underline font-medium">
            Go back to Impact
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Imagen principal de ancho completo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Secciones estilo periódico */}
        <div className="space-y-16">
          {post.sections.map((section, index) => {
            const isLeft = index % 2 === 0; // Alterna izquierda/derecha
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-start gap-8`}
              >
                {/* Imagen circular */}
                {section.image && (
                  <div
                    className={`relative flex flex-col items-center w-full lg:w-1/4 ${
                      isLeft ? '' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={section.image}
                      alt={section.subtitle}
                      className="w-32 h-32 object-cover rounded-full border-4 border-gray-800 shadow-md"
                    />
                    <p className="mt-2 text-center text-gray-500 text-sm">
                      {section.subtitle}
                    </p>
                    {/* Línea vertical */}
                    <div
                      className={`hidden lg:block absolute top-0 ${
                        isLeft ? 'left-full ml-4' : 'right-full mr-4'
                      } h-full w-1 bg-gray-800`}
                    ></div>
                  </div>
                )}

                {/* Contenido al lado de la línea */}
                <div
                  className={`flex-1 ${
                    isLeft ? 'lg:pl-8' : 'lg:pr-8 lg:order-1'
                  }`}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {section.subtitle}
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                    {section.content}
                  </p>

                  {/* Video si existe */}
                  {section.video && (
                    <div className="mt-4">
                      <iframe
                        width="100%"
                        height="315"
                        src={section.video}
                        title={section.subtitle}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botón volver */}
        <div className="mt-16 text-center">
          <Link
            to="/impact"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
          >
            Back to Impact
          </Link>
        </div>
      </div>
    </section>
  );
}
