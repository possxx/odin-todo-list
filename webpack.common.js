const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './src/index.js', 
    "./src/styles.css", 
    "./src/modules/navigation/project-navigation.js",
    "./src/modules/navigation/project-navigation-dom.js",
    "./src/modules/navigation/todo-navigation.js",
    "./src/modules/navigation/todo-navigation-dom.js",
    "./src/modules/content/todo-edit-content.js",
    "./src/modules/content/todo-render-content.js",
    "./src/modules/content/project-render-content.js",
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      }, 
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
