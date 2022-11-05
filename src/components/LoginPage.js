import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function LoginPage() {

    const { login, setLogin } = useContext(LoginContext);

    //styles
    const loginPage = {
        textAlign: 'left',
        margin: '80px auto auto',
        padding: '20px 20px 110px',
    };

    const loginCard = {
        width: '450px',
        margin: 'auto',
        background: '#f2f5fc',
        border: '1px solid grey',
        borderRadius: '10px',
        padding: '20px 40px'
    };

    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        setLogin("true");
        navigate("/resources");
    };

    return (<>
        <div style={loginPage}>
            <div style={loginCard}>
                <span >
                    <h3> Login / Signup </h3>
                </span>
                <br></br>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicMobile">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="text" placeholder="10 digit mobile number" required pattern="[0-9]{10}" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    </>);
}

export default LoginPage