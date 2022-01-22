export default {
  rules: [{ test: /\.woff(\?t=\d+)?$/, use: ['url-loader?limit=10000&mimetype=application/font-woff'] }],
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar]  :percent  (:elapsed seconds)'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { chunks: 'initial', minChunks: 2, maxInitialRequests: 5, minSize: 0, name: 'common' }
      }
    }
  }
};
