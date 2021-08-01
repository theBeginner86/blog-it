import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function MyNavbar(props) { 

    console.log(props);
    const {logOutHandle, isLogout} = props;
    console.log(isLogout);

    return ( 
        <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href="/">Blog It</Navbar.Brand>
                    <Nav className="me-auto">
                        { !isLogout && (
                            <Nav.Link onClick={logOutHandle}>Log Out</Nav.Link> 
                        )}
                        { isLogout && (
                            <React.Fragment>
                                <Nav.Link href="/signup">Register</Nav.Link>
                                <Nav.Link href="/signin">Login</Nav.Link> 
                            </React.Fragment> 
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
 
export default MyNavbar;