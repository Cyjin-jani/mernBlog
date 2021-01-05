import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Container, Navbar, NavbarToggler, Collapse, Nav, NavItem, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';
import RegisterModal from './auth/RegisterModal';



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

    const addPostClick = () => {

    }

    const authLink = (
        <Fragment>
            <NavItem>
                {userRole === "MainOwner" ? (
                    <Form className="col mt-2">
                        <Link to="post" className="btn btn-success block text-white px-3" onClick={addPostClick}>
                            Add Post
                        </Link>
                    </Form>
                ) : ""}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link>
                        <Button outline color="light" className="px-3" block>
                            <strong>{user ? `Welcome ${user.name}`: ""}</strong>
                        </Button>
                        </Link>
                    ): (
                        <Button outline color="light" className="px-3" block>
                            <strong>"No USER"</strong>
                        </Button>
                    )}
                </Form>
            </NavItem>
            <NavItem>
                <Form className="col">
                    <Link onClick={onLogout} to="#" >
                        <Button outline color="light" className="mt-2" block>
                            LogOut
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    )

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
                                authLink 
                            : 
                                guestLink
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar
