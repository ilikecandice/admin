'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
console.log(prodEnv)
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"/api"'
})
