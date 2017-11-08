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
        extensions: [".js", ".json", ".coffee", ".scss"]
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
        }, {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
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
