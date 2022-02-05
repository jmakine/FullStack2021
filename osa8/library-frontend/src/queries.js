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