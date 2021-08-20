import React from "react";
import CartProduct from "./CartProduct";
import "./Payment.css";

function Payment(props) {
  return (
    <div className="payment">
      <h1>Payment page</h1>
      <div className="payment__section">
        {props.cart.map((cartProduct) => {
          return (
            <CartProduct
              key={cartProduct.pid}
              cartProduct={cartProduct}
              setCart={props.setCart}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Payment;
