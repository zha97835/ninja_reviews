import React from 'react'
//import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from "react-markdown"

const REVIEWS = gql`
    query GetReviews {
        reviews{
            title,
            body,
            rating,
            id,
            categories{
                name,
                id
            }
        }
    }
`
export default function Homepage() {
    //const { loading, error, data } = useFetch('http://localhost:1337/reviews')

    const { loading, error, data } = useQuery(REVIEWS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)

    return (
        <div>
            {data.reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>

                    <small>console list:</small>
                    {review.categories.map(category => (
                        <small key={category.id}>{category.name}</small>
                    ))}

                    <p><ReactMarkdown>{review.body.substring(0, 200) + "..."}</ReactMarkdown></p>

                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
}