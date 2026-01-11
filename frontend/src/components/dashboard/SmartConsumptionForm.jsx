import { useState } from 'react';
import {
  WATER_OPTIONS,
  LIGHT_OPTIONS,
  PLASTIC_OPTIONS,
  CONSUMPTION_LIMITS
} from '../../constants/consumptionOptions';
import ConsumptionAlert from './ConsumptionAlert';

export default function SmartConsumptionForm({ onSave }) {
  const [type, setType] = useState('water');
  const [optionValue, setOptionValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [alert, setAlert] = useState('');

  const optionsMap = {
    water: WATER_OPTIONS,
    light: LIGHT_OPTIONS,
    plastic: PLASTIC_OPTIONS
  };

  const total = optionValue * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (total > CONSUMPTION_LIMITS[type]) {
      setAlert(`Tu consumo de ${type} es alto (${total})`);
    } else {
      setAlert('');
    }

    onSave({
      type,
      amount: total,
      date
    });

    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ConsumptionAlert message={alert} />

      <div>
        <label className="block text-sm font-bold mb-2">Tipo</label>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border"
        >
          <option value="water">💧 Agua</option>
          <option value="light">⚡ Luz</option>
          <option value="plastic">♻️ Plástico</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Uso</label>
        <select
          onChange={e => setOptionValue(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border"
        >
          <option value="">Selecciona</option>
          {optionsMap[type].map(opt => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Cantidad</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
      >
        Guardar Consumo
      </button>
    </form>
  );
}
