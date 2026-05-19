// Configuracion de Babel para Expo, NativeWind y Worklets.

module.exports = function (api) {
  // Mantiene la configuracion en cache para acelerar los arranques de Metro.
  api.cache(true);
  let plugins = [];

  // Plugin necesario para animaciones y tareas que usan Worklets.
  plugins.push('react-native-worklets/plugin');

  return {
    // Presets que preparan JSX y clases de NativeWind.
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
