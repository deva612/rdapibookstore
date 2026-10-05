import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout() {

    const location = useLocation()
    const navigate = useNavigate()

    // Buy Now se book aayi hai to use karo
    // warna Cart se books lo
    const [cart] = useState(() => {

        if (location.state?.book) {

            return [
                {
                    ...location.state.book,
                    quantity: location.state.quantity || 1
                }
            ]

        }

        return JSON.parse(localStorage.getItem('cart')) || []

    })


    const [customer, setCustomer] = useState({
        name: '',
        mobile: '',
        address: ''
    })


    const [paymentMethod, setPaymentMethod] = useState('COD')


    // Input handle
    const handleChange = (e) => {

        const { name, value } = e.target

        setCustomer({
            ...customer,
            [name]: value
        })
    }


    // Price calculate
    const subtotal = cart.reduce(
        (total, item) =>
            total + Number(item.originalPrice ?? item.price) * item.quantity,
        0
    )

    const delivery = cart.length > 0 ? 50 : 0

    const total = subtotal + delivery


    // Place Order
    const handlePlaceOrder = (e) => {

        e.preventDefault()

        if (
            !customer.name ||
            !customer.mobile ||
            !customer.address
        ) {
            alert('Please fill all customer details')
            return
        }

        alert(
            `Order placed successfully!\n\nPayment: ${paymentMethod}`
        )

        // Frontend demo ke liye cart clear
        localStorage.removeItem('cart')

        navigate('/')
    }


    return (
        <section className="checkout-section">

            <Container>

                <h1 className="checkout-heading">
                    Checkout
                </h1>


                <Form onSubmit={handlePlaceOrder}>

                    <Row>

                        {/* LEFT SIDE */}

                        <Col md={7}>

                            <Card className="checkout-card">

                                <h3>
                                    Customer Details
                                </h3>

                                <hr />


                                {/* Name */}

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Customer Name
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={customer.name}
                                        onChange={handleChange}
                                    />

                                </Form.Group>


                                {/* Mobile */}

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Mobile Number
                                    </Form.Label>

                                    <Form.Control
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter mobile number"
                                        value={customer.mobile}
                                        onChange={handleChange}
                                    />

                                </Form.Group>


                                {/* Address */}

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Delivery Address
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="address"
                                        placeholder="Enter complete delivery address"
                                        value={customer.address}
                                        onChange={handleChange}
                                    />

                                </Form.Group>


                                {/* Payment */}

                                <h4 className="payment-title">
                                    Payment Method
                                </h4>


                                <Form.Check
                                    type="radio"
                                    label="Cash on Delivery"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="payment-option"
                                />


                                <Form.Check
                                    type="radio"
                                    label="UPI"
                                    name="payment"
                                    value="UPI"
                                    checked={paymentMethod === 'UPI'}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="payment-option"
                                />


                                <Form.Check
                                    type="radio"
                                    label="Credit / Debit Card"
                                    name="payment"
                                    value="Card"
                                    checked={paymentMethod === 'Card'}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="payment-option"
                                />

                            </Card>

                        </Col>


                        {/* RIGHT SIDE */}

                        <Col md={5}>

                            <Card className="order-summary">

                                <h3>
                                    Order Summary
                                </h3>

                                <hr />


                                {/* Books */}

                                {cart.map((item) => (

                                    <div
                                        className="checkout-book"
                                        key={item._id}
                                    >

                                        <img
                                            src={item.bookImage}
                                            alt={item.bookTittle || item.bookTitle}
                                        />

                                        <div>

                                            <h5>
                                                {item.bookTittle || item.bookTitle}
                                            </h5>

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>

                                            <strong>
                                                ₹
                                                {Number(item.originalPrice ?? item.price) *
                                                    item.quantity}
                                            </strong>

                                        </div>

                                    </div>

                                ))}


                                <hr />


                                <div className="price-row">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹{subtotal}
                                    </span>

                                </div>


                                <div className="price-row">

                                    <span>
                                        Delivery
                                    </span>

                                    <span>
                                        ₹{delivery}
                                    </span>

                                </div>


                                <hr />


                                <div className="total-row">

                                    <span>
                                        Total
                                    </span>

                                    <span>
                                        ₹{total}
                                    </span>

                                </div>


                                <Button
                                    type="submit"
                                    variant="warning"
                                    className="place-order-btn"
                                >
                                    Place Order 🛍️
                                </Button>


                                <Button
                                    variant="outline-dark"
                                    className="back-cart-btn"
                                    onClick={() => navigate('/cart')}
                                >
                                    ← Back to Cart
                                </Button>

                            </Card>

                        </Col>

                    </Row>

                </Form>

            </Container>

        </section>
    )
}

export default Checkout