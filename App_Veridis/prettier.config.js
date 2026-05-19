// Configuracion de formato para que el codigo mantenga un estilo uniforme.

module.exports = {
  // Ajustes generales de lectura y consistencia.
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',

  // Ordena clases de Tailwind y reconoce atributos usados por NativeWind.
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],
};
