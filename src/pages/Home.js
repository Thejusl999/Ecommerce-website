import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Header from '../components/Layout/Header';
import {Button} from 'react-bootstrap';
import Footer from '../components/Layout/Footer';
import classes from './Home.module.css';
const Home=()=>{
    const tours=[
        {date:'JUL 16',place:'DETROIT, MI',venue:'DTE ENERGY MUSIC THEATRE'},
        {date:'JUL 19',place:'TORONTO, ON',venue:'BUDWEISER STAGE'},
        {date:'JUL 22',place:'BRISTOW, VA',venue:'JIGGY LUBE LIVE'},
        {date:'JUL 29',place:'PHOENIX, AZ',venue:'AK-CHIN PAVILION'},
        {date:'AUG 2',place:'LAS VEGAS, NV',venue:'T-MOBILE ARENA'},
        {date:'AUG 7',place:'CONCORD, CA',venue:'CONCORD PAVILION'},
    ]
    return (
        <>
            <Header/>
            <div className={classes.buttonDiv}>
                <button className={classes.btn}>Get our Latest Album</button>
                <button className={classes.playbtn}>▶</button>
            </div>
            <h2 className={classes.divTitle}>TOURS</h2>
            <Container className={classes.toursDiv} key={Math.random}>
                {tours.map((tour)=>(
                    <Row>
                        <Col md={2}>{tour.date}</Col>
                        <Col md={3}>{tour.place}</Col>
                        <Col md={4}>{tour.venue}</Col>
                        <Col md={3}>
                            <Button variant="primary" style={{marginTop:'-10px',marginBottom:'5px'}}>BUY TICKETS</Button>{' '}
                        </Col>
                        <div className={classes.underline}></div>
                    </Row>
                ))}
            </Container>
            <Footer/>
        </>
    );
}
export default Home;