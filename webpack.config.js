const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // Onde o arquivo compilado será armazenado
    filename: 'bundle.js', // Nome do arquivo compilado
  },
  mode: 'development', // Define o modo de desenvolvimento
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Arquivos JavaScript e JSX
        exclude: /node_modules/, // Exclui node_modules
        use: {
          loader: 'babel-loader', // Usando babel-loader para transpilar código
        },
      },
      {
        test: /\.css$/, // Arquivos CSS
        use: ['style-loader', 'css-loader'], // Adiciona os loaders para CSS
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i, // Arquivos de imagem
        type: 'asset/resource', // Trata imagens como assets (recursos)
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Arquivo HTML de template
    }),
  ],
  devServer: {
    static: './dist', // Diretório onde os arquivos compilados ficam
    port: 3000, // Porta do servidor
    historyApiFallback: true, // Redireciona todas as requisições para index.html
  },
};
