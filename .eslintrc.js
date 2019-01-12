module.exports = {
  root: true,
  env: {
    browser: true,
    jasmine: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jasmine/recommended'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./webpack.config.js')
      }
    },
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
  },
  parser: "babel-eslint",
  plugins: ['jasmine'],
};
