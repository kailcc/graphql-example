const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    id: '0',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: '1',
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type MutationResponse {
    success: Boolean
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): MutationResponse!
    deleteBook(id: ID!): MutationResponse!
    modifyBook(id: ID!, author: String, title: String): MutationResponse!
  }

`;

const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (parent, { title, author }) => {

      books.push(
        { id: String(books.length), title, author }
      )

      return {
        success: true
      }
    },
    deleteBook: (parent, { id }) => {
      const index = books.findIndex(v => v.id === id)

      if (index > -1) {
        books.splice(index, 1)
        return {
          success: true
        }
      }
      return {
        success: false
      }
    },
    modifyBook: (parent, { id, title, author }) => {
      const index = books.findIndex(v => v.id === id)
      const cur = books[index]

      if (index > -1) {

        if (title) {
          cur.title = title
        }
        if (author) {
          cur.author = author
        }

        books.splice(index, 1, cur)

        return {
          success: true
        }
      }
      return {
        success: false
      }
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});