import React from "react";

import "./Cart.css";
import CartProduct from "./CartProduct";

function Cart(props) {
  var cartTotal = props.cart.reduce((total, cartItem) => {
    return total + parseInt(cartItem.price);
  }, 0);
  // console.log(cartTotal);
  // var cartTotal = 0;

  if (props.cart.length === 0) {
    return (
      <div className="center">
        <img
          src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          alt="empty"
        />
        <p className="empty">Your cart is empty!</p>
        <p>It's a good day to buy the items you saved for later!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__left">
        <div className="cart__left__heading">
          <h3>My Cart ({props.cart.length})</h3>
        </div>

        <div className="margin"></div>

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

      <div className="cart__right">
        <div className="heading ">PRICE DETAILS</div>

        <div className="margin"></div>

        <div className="cart__right__item">
          <div>
            Price ({props.cart.length} item{props.cart.length > 1 ? "s" : ""})
          </div>
          <div>₹{cartTotal}</div>
        </div>

        <div className="cart__right__item">
          <div>Discount</div>
          <div className="discount">-₹{(0.1 * cartTotal).toFixed(2)}</div>
        </div>

        <div className="cart__right__item">
          <div>Delivery Charges</div>
          <div className="deliveryfee">FREE</div>
        </div>

        <div className="margin"></div>

        <div className="cart__right__item total">
          <div>Total Amount</div>
          <div>₹{cartTotal - (0.1 * cartTotal).toFixed(2)}</div>
        </div>

        <div className="margin"></div>

        <div className="cart__right__item">
          <div className="savings">
            You will save ₹{(0.1 * cartTotal).toFixed(2)} on this order
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
