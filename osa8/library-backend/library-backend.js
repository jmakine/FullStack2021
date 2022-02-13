const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to ', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB ', error.message))

const typeDefs = gql`
    
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }

    type Query {
        allAuthors: [Author!]! 
        allBooks(author: String, genre: String): [Book]!
        bookCount: Int!
        authorCount: Int!
        me: User
    }

    type Mutation {

        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String]
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
          username: String!
          favoriteGenre: String
        ): User

        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
    allAuthors: async () => await Author.find({}),

    allBooks: async (root, args) => {
      let author 
      if(args.author){
        author = await Author.findOne({name: args.author})
        if(!author) return []
      }
      
      let params
      if (!args.author && !args.genre) {
        params = {}
      } else if (args.author && args.genre) {
        params = {
          author: author.id,
          genres: { $elemMatch: { $eq: args.genre} } 
        }
      } else if (!args.author) {
        params = {
          genres: { $elemMatch: { $eq: args.genre} } 
        }
      } else if (!args.genre) {
        params = {
          author: author.id
        }
      }
      return Book.find(params).populate('author')
    },

    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {

    createUser: async (root, args) => {
      const user = new User({ username: args.username , favoriteGenre: args.favoriteGenre })
      try {
        await user.save()
      } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: 60*60 }) }
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      console.log(author)

      if(!author) {
        console.log('Author not in DB') 
        try {
          author = new Author({ name: args.author })
          await author.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } 
      
      let book 
      try {
        book = new Book({ ...args, author: author._id })
        await book.save()
        const bookCount = await Book.find({author: author.id}).countDocuments()
        await Author.findOneAndUpdate({name: args.author}, {bookCount: bookCount})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name }) 
      
      if(!author) {
        console.log("Author ", author, " not found")
      }

      try {
        const author = await Author.findOneAndUpdate({name: args.name}, {born: Number(args.setBornTo)})
        return author
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }  
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})