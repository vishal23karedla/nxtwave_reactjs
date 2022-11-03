import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Resources from './Resources';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Requests from './Requests';
import Users from './Users';

const Home = () => {
    return (<>
        <div className='d-flex justify-content-center m-4 '>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Col sm={3}>
                    
                    <Nav variant="pills" className="border border-secondary rounded bg-light">
                        <Row>
                            <Col>
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Resources</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Requests</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Users</Nav.Link>
                                </Nav.Item>
                            </Col>
                        </Row>
                    </Nav>


                    <div className='left m-5'>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </div>

                    <Row>
                        <div className='m-5'>
                            <Row className='m-5'>
                                <Col sm={9}>
                                    <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Resources />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Requests />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <Users />
                                            </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </div>
                    </Row>

                </Col>
            </Tab.Container>
        </div>
    </>)
}

export default Home