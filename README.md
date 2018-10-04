# Intain-graphql-util

This is a simple library for cleaner defenitions of types and resolvers in graphql.

## Usage

### Create Schema

```javascript
const { getResolvers, getTypes } = require('intain-graphql-util')

const server = new ApolloServer({
  typeDefs: getTypes(),
  resolvers: getResolvers()
})
```

### Register Type

This function is used to register defined types in the schema

```javascript
'use strict'

const { registerType } = require('intain-graphql-util')

const types = `
  type User {
    name: String

    createdAt: Date
    updatedAt: Date
  }

  input CreateUserInput {
    name: String!
  }
`

const mutations = `
  addUser(user: CreateUserInput!): User
`

const querys = `
  users(start: Int, limit: Int): [User]
`

registerType({
  Type: types,
  Mutation: mutations,
  Query: querys
})
```

### Register Resolver

This function is used to register resolver functions

```javascript
'use strict'
const { registerResolver } = require('intain-graphql-util')

registerResolver({
  Query: {
    users: () => users
  },
  Mutation: {
    addUser: user => users.push(user)
  }
})
```

### Register Enum

This function is used to register defined Enums in the schema

```javascript
'use strict'

const { registerEnum } = require('intain-graphql-util')

registerEnum(`
  enum Colors {
    RED
    GREEN
    BLUE
  }
`)
```

### Register Scalar

This function is used to register defined Enums in the schema

```javascript
'use strict'

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { registerScalar } = require('intain-graphql-util')

registerScalar('Date', {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10)
      }
      return null
    }
  })
})
```
