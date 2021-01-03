import React, { Fragment } from 'react';
import { Container, Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';


const AppNavbar = ()=> {
    return (
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        My DEV Blog YJ
                    </Link>
                    <NavbarToggler />
                    <Collapse isOpen={true} navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {false ? 
                                <h1 className="text-white">authLink</h1> 
                            : 
                                <LoginModal />
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar
