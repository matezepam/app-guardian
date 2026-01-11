import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <Loader2 className="h-12 w-12 text-teal-600" />
      </motion.div>

      <p className="text-gray-500 text-lg font-medium">
        {text}
      </p>
    </div>
  );
}
