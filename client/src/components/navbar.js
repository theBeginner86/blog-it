import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function MyNavbar(props) { 
    return ( 
        <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href="/">Blog It</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/signup">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
 
export default MyNavbar;