const LiveReloadPlugin = require('webpack-livereload-plugin');

const CWD = process.cwd();

module.exports = {
  context: CWD + '/src',
  entry: ['babel-polyfill', CWD + '/src/index.jsx'],
  output: {
    path: CWD + '/dist',
    filename: 'dist.min.js',
  },
  plugins: [
    new LiveReloadPlugin({})
  ],
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
