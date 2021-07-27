import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';

class MyNavbar extends Component {
    render() { 
        return ( 
            <div>
                <Navbar>
                    <Container>
                        <Navbar.Brand href="/">
                            Blog It
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
         );
    }
}
 
export default MyNavbar;