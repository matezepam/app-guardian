import { motion } from 'framer-motion';

const tips = [
  {
    title: 'Recicla correctamente',
    description:
      'Separa papel, plástico, vidrio y residuos orgánicos. Un reciclaje correcto reduce la contaminación y ahorra recursos naturales.',
    image:
      'https://images.unsplash.com/photo-1581579185169-7c3c8b1b0f68',
  },
  {
    title: 'Reduce el uso de plásticos',
    description:
      'Evita bolsas, botellas y envases de un solo uso. Opta por alternativas reutilizables y biodegradables.',
    image:
      'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3',
  },
  {
    title: 'Ahorra energía',
    description:
      'Apaga luces y dispositivos que no uses. El ahorro energético reduce emisiones contaminantes.',
    image:
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
  },
  {
    title: 'Cuida el agua',
    description:
      'Cierra el grifo cuando no lo necesites y reutiliza el agua siempre que sea posible.',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
  },
  {
    title: 'Consume responsablemente',
    description:
      'Compra solo lo necesario y apoya productos locales y sostenibles.',
    image:
      'https://images.unsplash.com/photo-1528825871115-3581a5387919',
  },
  {
    title: 'Reutiliza antes de desechar',
    description:
      'Muchos objetos pueden tener una segunda vida antes de convertirse en basura.',
    image:
      'https://images.unsplash.com/photo-1590080877777-8c4f42b0a3b2',
  },
];

export default function Tips() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Tips para Cuidar el Medio Ambiente 🌱
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Pequeñas acciones diarias pueden generar un gran impacto positivo en nuestro planeta.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-green-100 shadow-sm hover:shadow-lg transition-shadow rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-green-100">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {tip.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
