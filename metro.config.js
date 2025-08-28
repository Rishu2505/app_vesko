// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Just tell Metro to look for tslib in node_modules
  config.resolver.extraNodeModules = {
    ...(config.resolver.extraNodeModules || {}),
    tslib: require('path').resolve(__dirname, 'node_modules/tslib'),
  };

  return config;
})();
