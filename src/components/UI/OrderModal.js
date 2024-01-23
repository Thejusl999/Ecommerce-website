import React from "react";
import ReactDOM from "react-dom";
import CartItemsList from "../Cart/CartItemsList";
const ModalOverlay = (props) => {
  return <CartItemsList onCloseClick={props.onClick}/>
};
const OrderModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay onClick={props.onClose} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};
export default OrderModal;