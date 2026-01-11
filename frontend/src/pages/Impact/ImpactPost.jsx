import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import impactData from './ImpactData';

export default function ImpactPost() {
  const { slug } = useParams();
  const post = impactData.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 text-center text-gray-600">
        Post not found
        <div className="mt-4">
          <Link to="/impact" className="text-green-600 font-semibold hover:underline">
            Go back to Impact
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <motion.img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-[450px] object-cover shadow-lg mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
          {post.title}
        </h1>

        {post.sections.map((section, index) => {
          const isEven = index % 2 === 0;
          const bgColor = isEven ? 'bg-white' : 'bg-gray-50';
          const flexDirection = isEven ? 'lg:flex-row' : 'lg:flex-row-reverse';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`${bgColor} flex flex-col ${flexDirection} items-start mb-16 lg:mb-24 p-6 lg:p-12`}
            >

              {section.image && (
                <div className="flex-shrink-0 relative group mb-6 lg:mb-0 lg:mr-8 lg:ml-8">
                  <img
                    src={section.image}
                    alt={section.subtitle}
                    className="w-36 h-36 rounded-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-2xl"
                  />
                  <div className="absolute top-0 left-full h-full w-1 bg-gray-900 ml-4 rounded"></div>
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {section.subtitle}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6 text-lg">
                  {section.content}
                </p>

                {section.carousel && section.carousel.length > 0 && (
                  <ImageCarousel images={section.carousel} />
                )}

                {section.video && (
                  <div className="mt-6">
                    <iframe
                      className="w-full h-[300px]"
                      src={section.video}
                      title={section.subtitle}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        <div className="text-center mt-12">
          <Link
            to="/impact"
            className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
          >
            Back to Impact
          </Link>
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full mt-6">
      <motion.img
        key={images[current]}
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 lg:h-80 object-cover shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition"
      >
        &#8592;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition"
      >
        &#8594;
      </button>
    </div>
  );
}
