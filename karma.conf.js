module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],

    reporters: ['mocha'],

    browsers: ['ChromeHeadless'],

    files: ['frontend/test/index.coffee'],

    preprocessors: {
      'frontend/test/index.coffee': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: [".js", ".json", ".coffee"]
      },
      module: {
        rules: [{
          test: /\.coffee$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-runtime']
            }
          }, {
            loader: 'coffee-loader'
          }]
        }]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
}
