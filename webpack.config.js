const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //  точка входа, т.е файл относительно которого строятся граф зависимости
  entry: './src/index.js',

  // точка выхода результирующих файлов сборки
  output: {
    path: path.resolve(__dirname, 'build'), //папка
    filename: 'bundle.js', // имя js файла
  
  },

  // добавляем загрузчики
  module: {
    rules: [
      {
        // sass loader
        test: /\.scss$/i, // указываем расширение файла

        // указываем массив загрузчиков. вызываются с права на лево
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/, // указываем папку, которую не нужно включать в обработку
        use: ["babel-loader"],
      }
    ],
  },

  // плагины работают после загрузчиков
  plugins:
    [
      new HtmlWebpackPlugin({ template: 'src/index.html' }), //создает html и кидает его в папку build автоматически подключая js, css...
      new MiniCssExtractPlugin({ filename: 'styles.css', }), //создает css и кидает его в папку build
      new CleanWebpackPlugin(),
    ],
  
  // под капотом запускает лайф сервер и запускает webpack
  devServer: {
    port: 7777,
    clientLogLevel: 'error',
    open: true,
    stats: 'errors-only'
  }
};