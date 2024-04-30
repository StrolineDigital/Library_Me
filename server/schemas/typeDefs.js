
//This typeDefs.js file will define the queries and mutations used in the application.

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, title: String, bookId: String, image: String): User
    removeBook(bookId: String): User
  }

 type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;