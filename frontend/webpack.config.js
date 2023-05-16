const webpack = require('webpack');

module.exports = {
  // ...existing webpack configuration...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};