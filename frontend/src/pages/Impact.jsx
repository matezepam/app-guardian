import { motion } from 'framer-motion';
import ReadMoreButton from '../components/buttons/ReadMoreButton';

const impacts = [
  {
    title: 'Océanos llenos de plástico',
    description:
      'Cada año, millones de toneladas de plástico terminan en los océanos. Estos residuos afectan peces, aves y mamíferos marinos.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    slug: 'oceans',
  },
  {
    title: 'Animales afectados por la basura',
    description:
      'Muchos animales confunden residuos con alimento o quedan atrapados en ellos, causando heridas y muerte.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    slug: 'animals',
  },
  {
    title: 'Contaminación del suelo',
    description:
      'Los desechos sólidos degradan el suelo, afectando cultivos y fuentes de agua subterránea.',
    image: 'https://images.unsplash.com/photo-1581091215367-59ab6b9c8b67',
    slug: 'floor',
  },
  {
    title: 'Cambio climático y residuos',
    description:
      'La acumulación de basura genera gases de efecto invernadero como el metano.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    slug: 'weather',
  },
];

export default function Impact() {
  return (
    <section className="pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            ¿Cómo afecta la basura a nuestro planeta?
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
            La contaminación por residuos es uno de los mayores problemas ambientales actuales.
          </p>
        </motion.div>

        {/* Impact Sections */}
        <div className="space-y-24">
          {impacts.map((impact, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col-reverse ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
              >
                {/* Text */}
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    {impact.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {impact.description}
                  </p>

                  {/* Botón Read more */}
                  <ReadMoreButton to={`/impact/${impact.slug}`} />
                </div>

                {/* Image */}
                <div className="lg:w-1/2 w-full">
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={impact.image}
                      alt={impact.title}
                      className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
