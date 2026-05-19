// Configuracion de Tailwind para que NativeWind encuentre clases en la app.
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Rutas donde se escriben clases de Tailwind dentro del proyecto.
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  // Preset que adapta Tailwind al entorno React Native.
  presets: [require('nativewind/preset')],
  theme: {
    // Espacio preparado para ampliar colores, espaciados o tipografias.
    extend: {},
  },
  // Lugar para plugins de Tailwind si el diseno los necesita mas adelante.
  plugins: [],
};
