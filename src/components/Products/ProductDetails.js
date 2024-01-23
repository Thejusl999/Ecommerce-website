import React,{ useContext } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CartContext from '../../store/cart-context';
import classes from './ProductDetails.module.css';
const ProductDetails=()=>{
    const params=useParams();
    const products=useContext(CartContext);
    return (
        <>
            <h2 className={classes.divTitle}>{params.productID}</h2>
            {products.products.map((item)=>{
                console.log(item.title===params.productID)
                if(item.title===params.productID){
                    return (
                        <Container style={{textAlign:'center'}} key={Math.random}>
                            <Row><Col>
                                <h4>IMAGES</h4>
                                <div className={classes.imageTransition}><img src={item.imageUrl} alt={item.title}/></div>
                            </Col>
                            <Col>
                                <h4>REVIEWS</h4>
                                <li>Good Product (Anonymous)</li>
                            </Col></Row>
                        </Container>
                    )
                }
            })}
        </>
    )
}
export default ProductDetails;