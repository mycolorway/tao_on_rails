module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],

    reporters: ['mocha'],

    browsers: ['ChromeHeadless'],

    files: ['test/index.coffee'],

    preprocessors: {
      'test/index.coffee': ['webpack']
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
              presets: ['@babel/env'],
              plugins: ['@babel/transform-runtime']
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
