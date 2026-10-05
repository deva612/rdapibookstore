import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './Hero.css'

function Hero() {

    return (
        <section className="hero-section">

            <Container>
                <Row className="align-items-center">

                    {/* Left Side */}
                    <Col md={6}>

                        <p className="hero-small-text">
                            📚 Welcome to RDEC BookStore
                        </p>

                        <h1>
                            Good Books
                            <br />
                            Build Better
                            <span> Futures</span>
                        </h1>

                        <p className="hero-description">
                            Discover amazing books, explore new worlds
                            and expand your knowledge.
                        </p>

                        <Button
                            variant="warning"
                            className="shop-btn"
                        >
                            Shop Now →
                        </Button>

                    </Col>


                    {/* Right Side */}
                    <Col md={6} className="text-center">

                        <div className="book-stack">

                            <div className="book book-one">
                                Atomic Habits
                            </div>

                            <div className="book book-two">
                                The Alchemist
                            </div>

                            <div className="book book-three">
                                Rich Dad Poor Dad
                            </div>

                            <div className="book book-four">
                                Wings of Fire
                            </div>

                        </div>

                    </Col>

                </Row>
            </Container>

        </section>
    )
}

export default Hero