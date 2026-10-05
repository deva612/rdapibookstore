 import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 function MyNavBar() {
    return ( 
        <>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">RDEC</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Books</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>

        <>

    )
       
 }
  export default MyNavBar;