// Configuracion de Metro para Expo y NativeWind.
const { getDefaultConfig } = require('expo/metro-config');

const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */

// Parte de la configuracion base de Expo para no perder compatibilidad con el framework.
const config = getDefaultConfig(__dirname);

// Conecta Metro con el archivo de estilos globales que procesa NativeWind.
module.exports = withNativeWind(config, { input: './global.css' });
