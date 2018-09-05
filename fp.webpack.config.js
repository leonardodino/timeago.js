module.exports = Object.assign({}, require('./webpack.config'), {
  output: {
    path: __dirname + '/dist',
    filename: 'fp.min.js',
  },
  externals: /locales/,
})
