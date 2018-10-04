'use strict'

const { gql } = require('apollo-server')
const { flattenObject } = require('./utils')

const Types = []
const Resolvers = []

const map = {
  Query: 'Query',
  Mutation: 'Mutation',
  Type: 'Type'
}

const mapper = key => (map[key] ? map[key] : map['Type'])

const toApolloGraphQlTypeString = () => {
  const fields = {
    Type: [],
    Query: [],
    Mutation: []
  }

  Types.map(type => {
    Object.keys(type).map(key => {
      fields[mapper(key)].push(type[key])
    })
  })

  let res = ''
  Object.keys(fields).map(key => {
    const field = fields[key]

    field.map(sub => {
      if (key === 'Type') {
        res = res + `${sub}\n`
      } else {
        res =
          res +
          `type ${mapper(field)} {
          ${sub.map(sub => sub)}
        }`
      }
    })
  })

  return gql`
    ${res}
  `
}

const toApolloGraphQlResolverObject = () => {
  const tmpResolvers = Resolvers.slice(0)

  // Flatten all querys and remove undefined values
  let querys = tmpResolvers
    .map(resolver => resolver.Query)
    .filter(query => query)
  querys = flattenObject(querys)

  // Flatten all mutations and remove undefined values
  let mutations = tmpResolvers
    .map(resolver => resolver.Mutation)
    .filter(mutaiton => mutaiton)
  mutations = flattenObject(mutations)

  // Flatten all custom resolvers and remove undefined values
  let custom = tmpResolvers
    .map(item => {
      const keys = Object.keys(item).filter(
        i => i !== 'Query' && i !== 'Mutation'
      )
      for (let key in keys) {
        return {
          [keys[key]]: item[keys[key]]
        }
      }
    })
    .filter(item => item)

  custom = custom.reduce((item, value) => {
    return {
      ...item,
      ...value
    }
  })

  return {
    Query: { ...querys },
    Mutation: { ...mutations },
    ...custom
  }
}

const getTypes = () => {
  return toApolloGraphQlTypeString()
}

const getResolvers = () => {
  return toApolloGraphQlResolverObject()
}

const registerType = value => {
  Types.push({ ...value })
}

const registerEnum = value => {
  Types.push({
    Enum: value
  })
}

const registerResolver = value => {
  Resolvers.push({ ...value })
}

const registerScalar = (name, value) => {
  Types.push({ Scalar: `scalar ${name}` })
  Resolvers.push({ ...value })
}

module.exports = {
  toApolloGraphQlResolverObject: toApolloGraphQlResolverObject,
  toApolloGraphQlTypeString: toApolloGraphQlTypeString,
  registerEnum: registerEnum,
  registerResolver: registerResolver,
  registerScalar: registerScalar,
  registerType: registerType,
  getTypes: getTypes,
  getResolvers: getResolvers
}
