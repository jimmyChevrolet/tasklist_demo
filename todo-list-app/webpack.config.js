const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // Change to 'production' for production builds
  entry: './src/main.js', // Adjust this if your entry point is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__': JSON.stringify(true), // or false if not using Options API
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
  },
};
