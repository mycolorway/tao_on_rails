// const path = require('path');
//
// module.exports = {
//   entry: './src/tao',
//   output: {
//     filename: 'tao.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   resolve: {
//     extensions: [".js", ".json", ".coffee"]
//   },
//   module: {
//     rules: [{
//       test: /\.coffee$/,
//       use: [{
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/env']
//         }
//       }, {
//         loader: 'coffee-loader'
//       }]
//     }]
//   },
//   externals : {
//     lodash : {
//       commonjs: 'lodash',
//       commonjs2: 'lodash',
//       amd: 'lodash',
//       root: '_'
//     },
//     jquery: {
//       commonjs: 'jquery',
//       commonjs2: 'jquery',
//       amd: 'jquery',
//       root: '$'
//     }
//   }
// };
