const config = {
  env: {
    NODE_ENV: 'production'
  },
  defineConstants: {
    process: { env: { NODE_ENV: '"production"' } }
  },
  mini: {},
  h5: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000
    }
  }
}

module.exports = merge(config, {})
