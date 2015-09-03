var Webpack = require('webpack');
var Path = require('path')

path = function(part){
  return Path.resolve(__dirname, part);
};


module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  // devtool: 'eval',

  entry: {
    app:        path('app'),
    background: path('background'),
    tab:        path('tab')
  },

  output: {
    path: path('src'),
    filename: '[name].js',
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
