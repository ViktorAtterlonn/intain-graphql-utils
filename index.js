'use strict'

const graphqlUtils = require('./src/graphql')

module.exports = {
  registerEnum: graphqlUtils.registerEnum,
  registerResolver: graphqlUtils.registerResolver,
  registerScalar: graphqlUtils.registerScalar,
  registerType: graphqlUtils.registerType,
  getTypes: graphqlUtils.getTypes,
  getResolvers: graphqlUtils.getResolvers
}
