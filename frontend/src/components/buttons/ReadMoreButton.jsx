import { Link } from 'react-router-dom';

export default function ReadMoreButton({ to }) {
  return (
    <Link to={to}>
      <button className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium hover:scale-105 transition-transform shadow-md">
        Read more →
      </button>
    </Link>
  );
}
