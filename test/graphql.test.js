/* eslint-env mocha */

'use strict'

const expect = require('chai').expect
const mockery = require('mockery')

mockery.registerMock('apollo-server', {})

const {
  registerEnum,
  registerResolver,
  registerScalar,
  registerType,
  toApolloGraphQlResolverObject,
  toApolloGraphQlTypeString,
  getTypes,
  getResolvers
} = require('../src/graphql')

describe('Graphql Utils', () => {
  it('Can register Type', done => {
    let error

    try {
      const type = `
      type Product {
        _id: String
        name: String
        price: Int
      }
    `
      registerType({
        Type: type
      })
    } catch (e) {
      error = e
    }

    expect(error).to.be.undefined
    done()
  })

  it('Can register resolver', done => {
    let error

    try {
      registerResolver({
        Query: {
          product: () => 'test'
        },
        Mutation: {
          addProduct: () => 'test'
        }
      })
    } catch (e) {
      error = e
    }

    expect(error).to.be.undefined
    done()
  })

  it('Can register scalar', done => {
    let error

    try {
      registerScalar('Date', {})
    } catch (e) {
      error = e
    }

    expect(error).to.be.undefined
    done()
  })

  it('Can register enum', done => {
    let error

    try {
      registerEnum(`
        enum Test {
          test
          tmp
        }
      `)
    } catch (e) {
      error = e
    }

    expect(error).to.be.undefined
    done()
  })

  it('Can generate ApolloGraphqlResolverObject', done => {
    let error, res

    try {
      registerResolver({
        Query: {
          product: () => 'test'
        },
        Product: {
          likes: () => 'test'
        }
      })
      res = toApolloGraphQlResolverObject()
    } catch (e) {
      error = e
    }

    expect(typeof res).to.equal('object')
    expect(res.Product).to.not.be.undefined
    expect(res.Query).to.not.be.undefined
    expect(error).to.be.undefined
    done()
  })

  it('Can generate ApolloGraphqlTypeString', done => {
    let error, res

    try {
      const type = `
        type Product {
          _id: String
          name: String
          price: Int
        }
      `
      registerType({
        Type: type
      })
      registerEnum(
        `enum Test {
            test
            tmp
          }
        `
      )
      res = toApolloGraphQlTypeString()
    } catch (e) {
      error = e
    }

    expect(typeof res).to.equal('object')
    expect(error).to.be.undefined
    done()
  })

  it('Can get resolvers', done => {
    let error, res

    try {
      res = getResolvers()
    } catch (e) {
      error = e
    }

    expect(typeof res).to.equal('object')
    expect(res.Product).to.not.be.undefined
    expect(res.Query).to.not.be.undefined
    expect(error).to.be.undefined
    done()
  })

  it('Can get types', done => {
    let error, res

    try {
      res = getTypes()
    } catch (e) {
      error = e
    }

    expect(typeof res).to.equal('object')
    expect(error).to.be.undefined
    done()
  })
})
