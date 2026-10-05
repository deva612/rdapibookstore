import React, { useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Cart.css'

function Cart() {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    )

    // Cart ko localStorage me save karna
    const updateCart = (newCart) => {
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    // Quantity badhana
    const increaseQuantity = (id) => {

        const newCart = cart.map((item) => {

            if (item._id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item
        })

        updateCart(newCart)
    }

    // Quantity kam karna
    const decreaseQuantity = (id) => {

        const newCart = cart.map((item) => {

            if (item._id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }

            return item
        })

        updateCart(newCart)
    }

    // Book remove karna
    const removeItem = (id) => {

        const newCart = cart.filter((item) => item._id !== id)

        updateCart(newCart)
    }

    // Total calculate
    const subtotal = cart.reduce(
        (total, item) => total + Number(item.originalPrice ?? item.price) * item.quantity,
        0
    )

    const delivery = cart.length > 0 ? 50 : 0

    const total = subtotal + delivery


    return (
        <section className="cart-section">

            <Container>

                <h1 className="cart-heading">
                    My Cart 🛒
                </h1>

                {cart.length === 0 ? (

                    <div className="empty-cart">

                        <h2>Your Cart is Empty</h2>

                        <p>
                            Add some books to your cart.
                        </p>

                        <Button
                            as={Link}
                            to="/"
                            variant="dark"
                        >
                            Continue Shopping
                        </Button>

                    </div>

                ) : (

                    <Row>

                        {/* LEFT SIDE */}

                        <Col md={8}>

                            {cart.map((item) => (

                                <Card
                                    className="cart-card"
                                    key={item._id}
                                >

                                    <Row className="align-items-center">

                                        <Col xs={4} md={3}>

                                            <img
                                                src={item.bookImage}
                                                alt={item.bookTittle || item.bookTitle}
                                                className="cart-image"
                                            />

                                        </Col>


                                        <Col xs={8} md={5}>

                                            <h4>
                                                {item.bookTittle || item.bookTitle}
                                            </h4>

                                            <p>
                                                By {item.authorName}
                                            </p>

                                            <h5>
                                                ₹{item.originalPrice ?? item.price}
                                            </h5>

                                        </Col>


                                        <Col xs={8} md={2}>

                                            <div className="quantity-control">

                                                <Button
                                                    variant="outline-dark"
                                                    onClick={() =>
                                                        decreaseQuantity(item._id)
                                                    }
                                                >
                                                    −
                                                </Button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <Button
                                                    variant="outline-dark"
                                                    onClick={() =>
                                                        increaseQuantity(item._id)
                                                    }
                                                >
                                                    +
                                                </Button>

                                            </div>

                                        </Col>


                                        <Col xs={4} md={2}>

                                            <Button
                                                variant="outline-danger"
                                                onClick={() =>
                                                    removeItem(item._id)
                                                }
                                            >
                                                Remove
                                            </Button>

                                        </Col>

                                    </Row>

                                </Card>

                            ))}

                        </Col>


                        {/* RIGHT SIDE */}

                        <Col md={4}>

                            <Card className="summary-card">

                                <h3>
                                    Order Summary
                                </h3>

                                <hr />

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Delivery</span>
                                    <span>₹{delivery}</span>
                                </div>

                                <hr />

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div> 
                                <Button
                                   as={Link}
                                 to="/checkout"
                                   variant="warning"
                                 className="checkout-btn"
                                       >
                                      Proceed to Checkout →
                                   </Button>

                                

                            </Card>

                        </Col>

                    </Row>

                )}

            </Container>

        </section>
    )
}

export default Cart