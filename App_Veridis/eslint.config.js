/* Configuracion de ESLint para mantener reglas comunes de Expo y ajustes propios. */
/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// Combina la configuracion recomendada de Expo con reglas locales del proyecto.
module.exports = defineConfig([
  expoConfig,
  {
    // Evita revisar archivos generados.
    ignores: ['dist/*'],
  },
  {
    rules: {
      // Permite componentes anonimos en patrones donde React Native los acepta sin problema.
      'react/display-name': 'off',
    },
  },
]);
