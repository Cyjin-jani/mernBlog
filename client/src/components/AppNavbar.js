import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Container, Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';



const AppNavbar = ()=> {
    const [isOpen, setisOpen] = useState(false);
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
    console.log(userRole, "UserROLE");

    const dispatch = useDispatch();

    const onLogout = useCallback(
        () => {
            dispatch({
                type: LOGOUT_REQUEST
            })
        },
        [dispatch],
    )
    
    useEffect(() => {
        setisOpen(false)
    }, [user])

    const handleToggle = () => {
        setisOpen(!isOpen)
    }

    return (
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        My DEV Blog YJ
                    </Link>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {isAuthenticated ? 
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
