import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query getAllBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            title
            published
            author
            id
            genres
        }
    }

`

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
            addBook(
                title: $title, 
                author: $author, 
                published: $published, 
                genres: $genres
            ) {
                title
                author
                published
                genres
            }
        }
`

export const SET_BIRTHYEAR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            id
            bookCount
        }
    }
` 

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ME = gql`
    query {
        me {
            id
            username
            favoriteGenre
        }
    }
`