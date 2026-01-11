import { motion } from 'framer-motion';

export default function ConsumptionAlert({ message }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl font-semibold shadow-sm"
    >
      ⚠️ {message}
    </motion.div>
  );
}
