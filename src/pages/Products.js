import React, { useState } from "react";
import OrderModal from '../components/UI/OrderModal';
import ProductsList from "../components/Products/ProductsList";
import Header from "../components/Layout/Header";
import CartProvider from '../store/CartProvider';
const Products=()=>{
  const productsArr = [
    {
      title: "Colors",
      price: 100,
      imageUrl:"https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      id:Math.random()
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:"https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      id:Math.random()
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:"https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      id:Math.random()
    },
    {
      title: "Blue Color",
      price: 100,
      imageUrl:"https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      id:Math.random()
    },
  ];
  const [cartIsShown,setCartIsShown]=useState(false);
  const showCartHandler=()=>{setCartIsShown(true)};
  const hideCartHandler=()=>{setCartIsShown(false)};
  return (
    <CartProvider>
      {cartIsShown&&<OrderModal onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <ProductsList products={productsArr} onShowCart={showCartHandler}/>
    </CartProvider>
  );
}
export default Products;