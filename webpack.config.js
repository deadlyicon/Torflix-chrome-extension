var Webpack = require('webpack');
var path = require('path');

module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  // devtool: 'eval',

  entry: [
    __dirname
  ],

  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'client.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
    ]
  },

  resolve: {
    extensions: ["", ".coffee", ".js"]
  }
};



// process.env.NODE_ENV)
