const config = {
  env: {
    NODE_ENV: 'development'
  },
  defineConstants: {
    process: { env: { NODE_ENV: '"development"' } }
  },
  mini: {},
  h5: {}
}

module.exports = merge(config, {
  mini: {
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js'
    }
  },
  h5: {
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js'
    }
  }
})
