import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const CATEGORY = gql`
    query GetCategory ($id:ID!){
        category (id: $id){
            name,
            id,
            reviews {
                title,
                body,
                rating,
                id,
                categories {
                    id,
                    name
                }
            }
        }
    }
`

export default function Category() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(CATEGORY, {
        variables: { id: id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)

    return (
        <div>
            <h2>Reviews for category: {data.category.name}</h2>
            {data.category.reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>

                    <small>console list:</small>
                    {review.categories.map(category => (
                        <small key={category.id}>{category.name}</small>
                    ))}
                    <p>{review.body.substring(0, 200)}...</p>
                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
}
