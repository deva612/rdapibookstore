import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {

    return (

        <footer className="bg-dark text-white ">

            <Container className="py-5">

                <Row>

                    {/* About */}
                    <Col md={4} className="mb-4">

                        <h4 className="fw-bold">
                            📚 RDEC BookStore
                        </h4>

                        <p className="text-light">
                            Read • Learn • Grow
                        </p>

                        <p>
                            Discover your favorite books and
                            start your reading journey with us.
                        </p>

                    </Col>


                    {/* Quick Links */}
                    <Col md={4} className="mb-4">

                        <h5 className="fw-bold">
                            Quick Links
                        </h5>

                        <div className="d-flex flex-column gap-2">

                            <Link
                                to="/"
                                className="text-white text-decoration-none"
                            >
                                Home
                            </Link>

                            <Link
                                to="/books"
                                className="text-white text-decoration-none"
                            >
                                Books
                            </Link>

                            <Link
                                to="/contact"
                                className="text-white text-decoration-none"
                            >
                                Contact
                            </Link>

                        </div>

                    </Col>


                    {/* Contact */}
                    <Col md={4} className="mb-4">

                        <h5 className="fw-bold">
                            Contact Us
                        </h5>

                        <p>
                            <i className="bi bi-envelope me-2"></i>
                            rdecbookstore@gmail.com
                        </p>

                        <p>
                            <i className="bi bi-telephone me-2"></i>
                            +91 9876543210
                        </p>

                        <div className="mt-3">

                            <i className="bi bi-facebook fs-4 me-3"></i>

                            <i className="bi bi-instagram fs-4 me-3"></i>

                            <i className="bi bi-twitter-x fs-4"></i>

                        </div>

                    </Col>

                </Row>

            </Container>


            {/* Bottom */}
            <div className="border-top border-secondary">

                <Container className="py-3 text-center">

                    <p className="mb-0">
                        © 2026 RDEC BookStore. All Rights Reserved.
                    </p>

                </Container>

            </div>

        </footer>
    )
}

export default Footer