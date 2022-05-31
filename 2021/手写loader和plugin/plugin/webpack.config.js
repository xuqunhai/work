const path = require('path');
const DemoWebpackPlugin = require('./demo-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [new DemoWebpackPlugin()]
};
