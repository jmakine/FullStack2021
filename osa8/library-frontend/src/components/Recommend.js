import React, { useEffect, useState} from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show, books }) => {
    const meResponse = useQuery(ME)
    const [ me, setMe ] = useState(null)
    const [ recommended, setRecommended ] = useState([])
    const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if(meResponse.data && meResponse.data.me) {
            setMe(meResponse.data.me)
            getBooks({ variables: { genre: meResponse.data.me.favoriteGenre } })
        }
    }, [meResponse.data, books.data]) // eslint-disable-line

    useEffect(() => {
        if(result.data) {
            setRecommended(result.data.allBooks)
        }
    }, [result.data, me])

    if(!show) {
        return null
    }

    if(meResponse.loading) {
        return <div>loading ...</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <strong>{me.favoriteGenre}</strong></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommended.map(book => 
                        <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend