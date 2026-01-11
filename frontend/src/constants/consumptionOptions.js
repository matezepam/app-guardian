export const WATER_OPTIONS = [
  { label: 'Botella (500 ml)', value: 0.5 },
  { label: 'Botella (1 L)', value: 1 },
  { label: 'Botellón (20 L)', value: 20 },
  { label: 'Ducha corta (5 min)', value: 50 },
  { label: 'Ducha larga (10 min)', value: 100 }
];

export const LIGHT_OPTIONS = [
  { label: 'Foco LED (1 h)', value: 0.01 },
  { label: 'Televisor (1 h)', value: 0.1 },
  { label: 'Computadora (1 h)', value: 0.2 },
  { label: 'Aire acondicionado (1 h)', value: 1.5 }
];

export const PLASTIC_OPTIONS = [
  { label: 'Botella plástica', value: 0.03 },
  { label: 'Bolsa plástica', value: 0.01 },
  { label: 'Envase grande', value: 0.2 }
];

export const CONSUMPTION_LIMITS = {
  water: 150,
  light: 5,
  plastic: 1
};
