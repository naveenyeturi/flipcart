import React from "react";

import "./Cart.css";

function Cart(props) {
  var cartTotal = props.cart.reduce((total, cartItem) => {
    return total + parseInt(cartItem.price);
  }, 0);
  // console.log(cartTotal);

  return (
    <div className="cart">
      <div className="cart__left">
        <h3>Cart Left side</h3>
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
