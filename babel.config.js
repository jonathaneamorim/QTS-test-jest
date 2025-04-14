// babel.config.js
module.exports = function(api) {
  api.cache(true);
  
  const presets = [
    ['next/babel'],
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ];
  
  return { presets };
};