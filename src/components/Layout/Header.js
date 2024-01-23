import React,{useContext, useEffect} from "react";
import {NavLink,Link,useHistory} from 'react-router-dom'; 
import { Container, Navbar,Nav,Col } from "react-bootstrap";
import classes from "./Header.module.css";
import CartContext from '../../store/cart-context';
import AuthContext from "../../store/auth-context";
const Header = (props) => {
  let cartQuan=0;
  const authCtx=useContext(AuthContext);
  const cartCtx=useContext(CartContext);
  useEffect(()=>cartCtx.cartUpdater(),[]);
  cartCtx.items.map((item)=>{
    cartQuan+=Number(item.quantity);
  })
  const history=useHistory();
  const logoutHandler=()=>{
      authCtx.logout();
      localStorage.clear();
      history.push('/');
  }
  return (
    <>
      <Navbar bg="black" expand="sm" variant="dark" className={classes.nav}>
        {authCtx.isLoggedIn?
          (<button className={classes.link1} onClick={logoutHandler}>logout</button>):
          (<Link className={classes.link1} to="/">login</Link>)
        }
        <Nav className={classes.tabsdiv}>
          <NavLink className={classes.link} activeClassName={classes.active} to="/home">HOME</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/products">STORE</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/about">ABOUT</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/contact">CONTACT</NavLink>
        </Nav>
        <div className={classes.cartdiv}>
          <button className={classes.button} onClick={props.onShowCart}>cart</button>
          {authCtx.isLoggedIn&&<h5 className={classes.cartquan}>{`${cartQuan.toFixed(0)}`}</h5>}
          {!authCtx.isLoggedIn&&<h5 className={classes.cartquan}>0</h5>}
        </div>
      </Navbar>
      <Container className={classes.titlediv}>
        <Col>The Generics</Col>
      </Container>
    </>
  );
};
export default Header;
