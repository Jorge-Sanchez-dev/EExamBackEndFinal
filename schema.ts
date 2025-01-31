export const typeDefs = `#graphql

type Contact {
    id: ID!
    name: String!
    phone: String!
    direcion: String!
    ciudad: String!
    temperatura: String!
    horaLocal: String!
}

type Query {
    getRestaurant(id:ID!): Contact!
    getrestaurants(ciudad: string!): [Contact!]!
}

type Mutation {
    addrestaurant(name:String!, phone:String!, direcion: String!, ciudad: String): Contact!
    deleteContact(id:ID!): Boolean
}
`