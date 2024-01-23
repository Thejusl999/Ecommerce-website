import React from 'react';
import {Container,Col} from 'react-bootstrap';
import classes from './Footer.module.css';
const Footer=()=>{
    return (
        <>
            <Container className={classes.footer}>
                <Col>The Generics</Col>
            </Container>
        </>
    )
}
export default Footer;