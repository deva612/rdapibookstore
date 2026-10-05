import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

function BookPageForEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        bookTittle: "",
        authorName: "",
        imprint: "",
        publicationYear: "",
        productFrom: "",
        publisher: "",
        genre: "",
        isbnNo: "",
        bookCategory: "",
        edition: "",
        language: "",
        description: "",
        shortDescription: "",
        countryOfOrigin: "",
        nameOfManufacturer: "",
        addressOfManufacturer: "",
        nameOfPackager: "",
        addressOfPackager: "",
        rating: "",
        reviews: "",
        originalPrice: ""
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Get book details from backend
    useEffect(() => {

        axios({
            url: apiUrl + "/book/for/edit/" + id,
            method: "get"
        })
        .then((res) => {

            setBook((prev) => ({
                ...prev,
                ...res.data.data
            }));

        })
        .catch((err) => {

            alert(
                err.response?.data?.message ||
                "Error fetching book details"
            );

        })
        .finally(() => {
            setLoading(false);
        });

    }, [id]);

    // Handle input changes
    function manageUpdate(e) {

        const { name, value } = e.target;

        setBook((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    // Update book details
    function editBook(e) {

        e.preventDefault();

        setUpdating(true);

        axios({
            url: apiUrl + "/edit/book/" + id,
            method: "put",
            data: book
        })
        .then((res) => {

            alert(
                res.data.message ||
                "Book updated successfully!"
            );

            navigate("/books");

        })
        .catch((err) => {

            alert(
                err.response?.data?.message ||
                "Error updating book"
            );

        })
        .finally(() => {
            setUpdating(false);
        });

    }

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <h4>Loading Book Details...</h4>
            </Container>
        );
    }

    return (

        <Container className="min-vh-100 py-4">

            <Row className="justify-content-center">

                <Col
                    xs={12}
                    lg={10}
                    className="border p-4 rounded bg-white mt-3 shadow"
                >

                    <h3 className="text-center text-danger mb-4">
                        Edit Book Details
                    </h3>

                    <Form onSubmit={editBook}>

                        <Row>

                            {/* Book Title */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Book Title
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="bookTittle"
                                        value={book.bookTittle || ""}
                                        onChange={manageUpdate}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {/* Author Name */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Author Name
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="authorName"
                                        value={book.authorName || ""}
                                        onChange={manageUpdate}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {/* Imprint */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Imprint
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="imprint"
                                        value={book.imprint || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Publication Year */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Publication Year
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="publicationYear"
                                        value={book.publicationYear || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Product From */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Product From
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="productFrom"
                                        value={book.productFrom || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Publisher */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Publisher
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="publisher"
                                        value={book.publisher || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Genre */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Genre
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="genre"
                                        value={book.genre || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* ISBN No */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        ISBN No
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="isbnNo"
                                        value={book.isbnNo || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Book Category */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Book Category
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="bookCategory"
                                        value={book.bookCategory || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Edition */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Edition
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="edition"
                                        value={book.edition || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Language */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Language
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="language"
                                        value={book.language || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Original Price */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Original Price
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="originalPrice"
                                        value={book.originalPrice || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Country Of Origin */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Country Of Origin
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="countryOfOrigin"
                                        value={book.countryOfOrigin || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Name Of Manufacturer */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Name Of Manufacturer
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="nameOfManufacturer"
                                        value={book.nameOfManufacturer || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Address Of Manufacturer */}
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Address Of Manufacturer
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="addressOfManufacturer"
                                        value={book.addressOfManufacturer || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Name Of Packager */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Name Of Packager
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="nameOfPackager"
                                        value={book.nameOfPackager || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Address Of Packager */}
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Address Of Packager
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="addressOfPackager"
                                        value={book.addressOfPackager || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Rating */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Rating
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="rating"
                                        value={book.rating || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Reviews */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Reviews
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="reviews"
                                        value={book.reviews || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Short Description */}
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Short Description
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="shortDescription"
                                        value={book.shortDescription || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                            {/* Description */}
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Description
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="description"
                                        value={book.description || ""}
                                        onChange={manageUpdate}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>

                        {/* Buttons */}
                        <div className="d-flex gap-3 mt-3">

                            <Button
                                variant="danger"
                                type="submit"
                                disabled={updating}
                            >
                                {updating ? "Updating..." : "Update Book"}
                            </Button>

                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigate("/books")}
                            >
                                Cancel
                            </Button>

                        </div>

                    </Form>

                </Col>

            </Row>

        </Container>

    );

}

export default BookPageForEdit;