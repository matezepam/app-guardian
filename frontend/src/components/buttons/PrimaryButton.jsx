export default function PrimaryButton({ children, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}