const { compilerOptions } = require('./tsconfig.json');

const alias = {};

Object.entries(compilerOptions.paths).forEach(path => {
  alias[path[0].replace('/*', '')] = path[1][0].replace('/*', '')
})

module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
    ],
    plugins: [
      ["module-resolver", { alias }],
      'react-native-reanimated/plugin',
    ]
  };
};
