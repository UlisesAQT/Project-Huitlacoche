import { Nav, Navbar, NavbarBrand, Container, Row, Col } from "reactstrap";
import React from 'react'

// import  logog from src

const Header = () => {
    return(
        <Navbar dark color='warning' sticky='top' expand='md'>
            <Container fluid >
                 <Row className='w-100 align-items-center'>
                    <Col xs='auto'>
                    <NavbarBrand href='/'>
                      <h1>RestTech</h1>  
                    </NavbarBrand>
                    </Col>
                    <Col className='text-end'>
                    <h3 className="m-0" >Welcome Tacos el Rancho</h3>
                    </Col>
                 </Row>
            </Container>

        </Navbar>

    );
}
export default Header;

