import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const { login, setLogin } = useContext(LoginContext);

    const navigate = useNavigate();
    
    const toCreateItem = () => {
        navigate('resource/create');
    };

    const logOut = () => {
        setLogin("false");
        navigate('/');
    };

    return (<>

        <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className=''>
            <Navbar.Brand href="/">
                <img
                    src="NxtWave TM_Coloured logo.png"
                    width="82"
                    height="40"
                    className="d-inline-block align-top m-1"
                    alt="Comp Logo"
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/" className=''><span className='h4 text-dark'></span></Nav.Link>
                </Nav>

                {login === "true" &&
                    <Nav>
                        <Nav.Link to='/resource/create'>
                            <button className='btn btn-success mr-3' onClick={toCreateItem}>ADD ITEM</button>
                        </Nav.Link>

                        <Nav.Link >
                            <button className='btn btn-outline-secondary mr-3' onClick={  logOut  }>Log out</button>
                        </Nav.Link>
                        
                        <Nav.Link eventKey={2} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    </>)
}

export default NavBar