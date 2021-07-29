import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function MyNavbar(props) { 

    const {logOutHandle} = props;

    return ( 
        <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href="/">Blog It</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            (localStorage.getItem("token")) ? 
                            <Nav.Link onClick={logOutHandle}>Log Out</Nav.Link> 
                            : 
                            <React.Fragment>
                                <Nav.Link href="/signup">Register</Nav.Link>
                                <Nav.Link href="/signin">Login</Nav.Link> 
                            </React.Fragment> 
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
 
export default MyNavbar;