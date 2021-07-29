import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function MyNavbar(props) { 
    return ( 
        <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href="/">
                        Blog It
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}
 
export default MyNavbar;