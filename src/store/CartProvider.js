import React, { useContext, useState } from 'react';
import CartContext from "./cart-context";
import AuthContext from "./auth-context";
const CartProvider=props=>{
  const authCtx=useContext(AuthContext);
  let arr=[];
  const products=[
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
  const [items,setItems]=useState([]);
  let flag=0;
  const addItemToCartHandler=(item)=>{
      items.forEach((cartItem)=>{
          if(cartItem.title===item[0].title){
              flag=1;
              cartItem.quantity=(Number(cartItem.quantity)+1).toString()
              setItems([...items])
          }
      })
      if(!flag)
          setItems([...items,...item]);
  };
  const removeItemToCartHandler=(item)=>{
      items.forEach((cartItem)=>{
          if(cartItem.title===item){
              cartItem.quantity=(Number(cartItem.quantity)-1).toString()
              setItems([...items])
          }
      })
  };
  const updateCartHandler=()=>{
    setTimeout(()=>{
      fetch(`${authCtx.baseUrl}/${authCtx.userEmail}`)
      .then(response=>response.json())
      .then(data=>{
        data.map(item=>{
          arr.push(item);
          setItems(arr);
        })
      })
    },0)
  }
  
  const cartContext={
      products:products,
      items:items,
      addItem:addItemToCartHandler,
      removeItem:removeItemToCartHandler,
      cartUpdater:updateCartHandler
  }
  return <CartContext.Provider value={cartContext}>
      {props.children}
  </CartContext.Provider>
}
export default CartProvider;