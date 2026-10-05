import React from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import Login from '../Login.jsx'
function Header() {
    let [showLoginModal, setShowLoginModal] = useState(false)
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [userName, setUserName] = useState('')

    const syncUserState = () => {
        const flag = localStorage.getItem('isLoggedIn')
        if (flag === 'true') {
            setIsLoggedIn(true)
            setUserName(localStorage.getItem('name') || 'User')
        } else {
            setIsLoggedIn(false)
            setUserName('')
        }
    }

    useEffect(() => {
        syncUserState()
    }, [])

    function goforlogin() {
        setShowLoginModal(true)
    }

    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg" className="py-2">

            <Container fluid>     

                {/* Logo + Website Name */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center"
                >

                    <Image
                        src="/logo1.png"
                        width="50"
                        height="50"
                        roundedCircle
                        className="me-2"
                    />

                    <div>
                        <div className="fw-bold">
                            RDEC BookStore
                        </div>

                        <small>
                            Read • Learn • Grow
                        </small>
                    </div>

                </Navbar.Brand>


                {/* Mobile Menu Button */}
                <Navbar.Toggle aria-controls="main-navbar" />


                <Navbar.Collapse id="main-navbar">

                    {/* Search */}
                    <Form className="d-flex mx-auto my-2 my-lg-0">

                        <FormControl
                            type="search"
                            placeholder="Search for books, authors..."
                            className="me-2"
                        />

                        <Button variant="warning">
                            Search
                        </Button>

                    </Form>


                    {/* Menu */}
                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        {/* <Nav.Link as={Link} to="/books">
                            Books
                        </Nav.Link> */}
                        {/* <Nav.Link href="/books">
                            Books
                          </Nav.Link> */}
                          <Nav.Link as={Link} to="/books">
                                Books
                                </Nav.Link>

                        <Nav.Link as={Link} to="/contact">
                            Contact
                        </Nav.Link>

                        <Nav.Link as={Link} to="/cart">
                            🛒 Cart
                        </Nav.Link>

                        {isLoggedIn ? (
                            <>
                                <span className="text-white mt-2">Welcome {userName}</span>
                                <Button variant="info" className="ms-1 rounded-circle" aria-label="Profile">
                                    <i className="bi bi-person-circle"></i>
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="info"
                                className="ms-1 rounded-circle"
                                onClick={goforlogin}
                                aria-label="Login"
                            >
                                <i className="bi bi-person-circle"></i>
                            </Button>
                        )}

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>
        <Login
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            onLoginSuccess={(name) => {
                setIsLoggedIn(true)
                setUserName(name)
                setShowLoginModal(false)
            }}
        />
        </>
    )
}

export default Header 