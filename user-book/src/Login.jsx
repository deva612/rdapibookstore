import { Button, Modal, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

function Login({ show, onHide, onLoginSuccess }) {
    const [showLoginWindow, setShowLoginWindow] = useState(true);
    const [showSignupWindow, setShowSignupWindow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleClose() {
        onHide();
    }

    function openSignupWindow() {
        setShowLoginWindow(false);
        setShowSignupWindow(true);
    }

    function openLoginWindow() {
        setShowLoginWindow(true);
        setShowSignupWindow(false);
    }
    function doLogin() {
        const data = {
            email,
            password
        };

        axios({
            url: apiUrl + '/user/login',
            method: 'post',
            data
        })
            .then((res) => {
                const user = res.data?.data || {};
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('name', user.name || user.firstName || 'User');
                localStorage.setItem('email', user.email || email);
                localStorage.setItem('token', user.token || '');

                if (onLoginSuccess) {
                    onLoginSuccess(user.name || user.firstName || 'User');
                }

                alert('Login Successfully.........');
                onHide();
            })
            .catch((err) => {
                alert(err.response?.data?.message || err.message || 'Login failed');
            });
    }

    function signup(event) {
        event.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        };

        axios({
            url: apiUrl + '/create/user',
            method: 'post',
            data
        })
            .then((res) => {
                alert(res.data.message);
                onHide();
            })
            .catch((err) => {
                alert(err.response?.data?.message || err.message);
            });
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="border-0">
            <Modal.Header closeButton className="bg-primary bg-gradient text-white border-0 py-3">
                <Modal.Title className="fw-bold fs-4">
                    {showLoginWindow ? 'Login' : 'Create Account'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4 bg-light">
                {showLoginWindow && (
                    <Form>
                        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPasswordLogin" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <Button variant="success" className="mt-2"  onClick={doLogin}>
                            Login
                        </Button>
                        <br /><br />
                        <span>Do you have an account?</span>{' '}
                        <span
                            className="text-danger fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openSignupWindow()}
                        >
                            Create Account
                        </span>
                    </Form>
                )}

                {showSignupWindow && (
                    <Form onSubmit={signup}>
                        <Row className="g-2 mb-3">
                            <Col md={6}>
                                <FloatingLabel controlId="floatingFirstName" label="First Name">
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingLastName" label="Last Name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <FloatingLabel controlId="floatingEmailSignup" label="Email Address" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPasswordSignup" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 py-2 mt-2 fw-bold rounded-3 shadow-sm"
                        >
                            Sign Up
                        </Button>
                        <br /><br />
                        <span
                            className="text-danger fw-bold mt-2 d-inline-block"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openLoginWindow()}
                        >
                            Go For Login
                        </span>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default Login;