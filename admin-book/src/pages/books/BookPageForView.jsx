import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap"
import axios from "axios"
import "bootstrap-icons/font/bootstrap-icons.css"

const apiUrl = import.meta.env.VITE_API_URL

function BookPageForView() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [book, setBook] = useState(null)

    useEffect(() => {

        axios({
            url: apiUrl + "/book/" + id,
            method: "get"
        })
            .then((res) => {
                setBook(res.data.data)
            })
            .catch((err) => {
                console.log(err)
                alert("Book data not found")
            })

    }, [id])

    if (!book) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <h5 className="mt-3">Loading Book...</h5>
            </Container>
        )
    }

    return (
        <Container className="mt-5">

            <Row className="justify-content-center">

                <Col md={10} lg={8}>

                    <Card className="shadow">

                        <Card.Header className="bg-info text-white">
                            <h3 className="mb-0">
                                <i className="bi bi-book"></i> Book Details
                            </h3>
                        </Card.Header>

                        <Card.Body>

                            <Row>

                                {/* Book Image */}
                                <Col md={4} className="text-center">

                                    <img
                                        src={book.bookImage}
                                        alt={book.bookTittle || book.bookTitle}
                                        className="img-fluid rounded"
                                        style={{
                                            maxHeight: "300px",
                                            objectFit: "cover"
                                        }}
                                    />

                                </Col>

                                {/* Book Details */}
                                <Col md={8}>

                                    <h2 className="text-primary">
                                        {book.bookTittle || book.bookTitle}
                                    </h2>

                                    <hr />

                                    <p>
                                        <strong>
                                            <i className="bi bi-person"></i> Author:
                                        </strong>{" "}
                                        {book.authorName}
                                    </p>

                                    <p>
                                        <strong>
                                            <i className="bi bi-currency-rupee"></i> Price:
                                        </strong>{" "}
                                        ₹{book.originalPrice ?? book.price}
                                    </p>

                                    <p>
                                        <strong>ISBN No:</strong>{" "}
                                        {book.isbnNo}
                                    </p>

                                    <p>
                                        <strong>No Of Pages:</strong>{" "}
                                        {book.nop}
                                    </p>

                                    <p>
                                        <strong>Publication:</strong>{" "}
                                        {book.publicationYear || book.publication}
                                    </p>

                                </Col>

                            </Row>

                        </Card.Body>

                        <Card.Footer>

                            <Button
                                variant="secondary"
                                onClick={() => navigate("/books")}
                            >
                                <i className="bi bi-arrow-left"></i>{" "}
                                Back to Books
                            </Button>

                            <Button
                                variant="warning"
                                className="ms-2"
                                onClick={() =>
                                    navigate("/edit/book/" + book._id)
                                }
                            >
                                <i className="bi bi-pencil"></i>{" "}
                                Edit
                            </Button>

                        </Card.Footer>

                    </Card>

                </Col>

            </Row>

        </Container>
    )
}

export default BookPageForView