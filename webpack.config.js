const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer:{
    contentBase: './dist'
  },
  plugins:[
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({title:'nnn',template:'index.html'})
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
            {
              test: /\.(png|svg|jpg|gif)$/,
               use: [
                  'file-loader',
               ],
         },
    ]
  }
};