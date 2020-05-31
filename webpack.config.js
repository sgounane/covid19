var path = require('path');

module.exports = {
  entry: './static/script.js',
  output: {
    path: path.resolve(__dirname+"/static"),
    filename: '_bundle.js'
  }
};