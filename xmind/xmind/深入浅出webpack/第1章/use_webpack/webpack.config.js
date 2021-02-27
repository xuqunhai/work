const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: './main.js',
  output: {
    // filename: '[name]-[hash:5].js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader?minimize'],
        /*
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimize: true,
          }
        }],
        */
       /*
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
        */
        loader: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    /*
    new ExtractTextPlugin({
      // filename: `[name]_[chunkhash:5].css`
      // filename: `[name]_[hash:5].css`
      // filename: `[name]_[contenthash:5].css` // 报错
      filename: `[name]_[id].css` // main_main.css
    }),
    */
    new MiniCssExtractPlugin({
      // filename: "[name]_[contenthash:5].css",
      filename: "[name].css",
      // chunkFilename: "[id].css"
    }),
  ]
};