import React from 'react';
const CartContext=React.createContext({
    products:[],
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    cartUpdater:()=>{}
});
export default CartContext;