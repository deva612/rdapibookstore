import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './HomeCard.css'

const apiUrl = import.meta.env.VITE_API_URL

function HomeCard() {

    const [books, setBooks] = useState([])

    useEffect(() => {

        axios({
            url: apiUrl + '/user/books',
            method: 'get'
        })
            .then((res) => {
                setBooks(res.data.data)
            })
            .catch((err) => {
                alert(err)
            })

    }, [])


    return (

        <section className="books-section py-5 bg-success bg-opacity-10">

            <Container>

                {/* Heading */}
                <div className="books-heading">

                    <p>Our Collection</p>

                    <h2>
                        Featured Books
                    </h2>

                    <span>
                        Discover books that inspire,
                        educate and entertain.
                    </span>

                </div>


                <Row>

                    {books.map((book) => (

                        <Col
                            key={book._id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            className="mb-4"
                        >

                            <Card className="book-card">

                                {/* Image */}
                                <div className="book-image-wrapper">

                                    <Card.Img
                                        src={book.bookImage}
                                        alt={book.bookTittle}
                                        className="book-image"
                                    />

                                </div>


                                <Card.Body>

                                    {/* Book Title */}
                                    <Card.Title className="book-title">
                                        {book.bookTittle}
                                    </Card.Title>


                                    {/* Author */}
                                    <p className="book-author">
                                        By {book.authorName}
                                    </p>


                                    {/* Publication */}
                                    <p className="book-publication">
                                        {book.publicationYear || book.publication}
                                    </p>


                                    {/* Price */}
                                    <h5 className="book-price">
                                        ₹{book.originalPrice ?? book.price}
                                    </h5>


                                    {/* View Details */}
                                    <Button
                                        as={Link}
                                        to={`/book/${book._id}`}
                                        variant="dark"
                                        className="details-btn"
                                    >
                                        View Details →
                                    </Button>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

            </Container>

        </section>
    )
}

export default HomeCard