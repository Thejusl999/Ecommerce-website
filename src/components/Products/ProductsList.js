import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { Container,Row,Col,Button} from 'react-bootstrap';
import Footer from '../Layout/Footer';
import classes from './ProductsList.module.css';
import CartContext from '../../store/cart-context';
import AuthContext from '../../store/auth-context';
const ProductsList=(props)=>{
    const cartCtx=useContext(CartContext);
    const authCtx=useContext(AuthContext);
    const postRequestHandler=(e)=>{
        let item={
            title: e.target.parentElement.parentElement.firstChild.textContent,
            price: Number(e.target.parentElement.firstChild.textContent.substring(1)),
            imageUrl: e.target.parentElement.parentElement.children[1].firstChild.firstChild.src,
            quantity: 1,
        }
        let fetchUrl=`${authCtx.baseUrl}/${authCtx.userEmail}`;
        fetch(fetchUrl,{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                'Content-Type':'application/json',
            }
        })
        cartCtx.addItem([item]);
    }
    function addCartHandler(e){
        let item;
        fetch(`${authCtx.baseUrl}/${authCtx.userEmail}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.length!==0){
                let flag=0;
                let productId='';
                data.map(product=>{
                    if(product.title===e.target.parentElement.parentElement.firstChild.textContent){
                        flag=1;
                        item={
                            title: product.title,
                            price: product.price,
                            imageUrl: product.imageUrl,
                            quantity:product.quantity+1,
                        }
                        productId=product._id;
                        cartCtx.addItem([item]);
                    }
                })
                if(flag){
                    fetch(`${authCtx.baseUrl}/${authCtx.userEmail}/${productId}`,{
                        method:'PUT',
                        body:JSON.stringify(item),
                        headers:{'Content-Type':'application/json'},
                    })
                }else{
                    postRequestHandler(e);
                }
            }else{
                postRequestHandler(e);
            }
        })
    }
    return(
        <>
            <div className={classes.imageContainer}>
                <h2 className={classes.divTitle}>MUSIC</h2>
                <Container>
                    <Row>
                        {props.products.map((image)=>(
                            <Col lg={6} md={12} key={image.id}>
                                <h2 className={classes.imgTitle}>{image.title}</h2>
                                <Container className={classes.imageTransition}>
                                    <Link to={`/products/${image.title}`}>
                                        <img src={image.imageUrl} alt={image.title}/>
                                    </Link>
                                </Container>
                                <div className={classes.priceAndButton}>
                                    <h5>${image.price}</h5>
                                    <button className={classes.addbtn} onClick={addCartHandler}>ADD TO CART</button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Button className={classes.viewcartbtn} variant="secondary" onClick={props.onShowCart}>See the cart</Button>{' '}
            </div>
            <Footer/>
        </>
    )    
}
export default ProductsList;