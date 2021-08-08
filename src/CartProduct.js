import React from "react";
import "./CartProduct.css";

import { db } from "./firebase.js";

function CartProduct(props) {
  const sellerName = [
    "PETILANTE",
    "TRUENET",
    "SuperComNet",
    "TARANSHA",
    "CORSECA",
  ];

  const handleQuantityValue = (e) => {
    console.log(e);
  };

  const removeCartItem = () => {
    const cartRef = db.collection("cart");

    //don't use snapshot here because it will delete as soon as u add it(it updates when firebase is changed and this code will run)
    // cartRef.onSnapshot((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     const productData = doc.data();
    //     if (
    //       productData.userEmail === localStorage.getItem("email") &&
    //       props.cartProduct.pid === doc.data().pid
    //     ) {
    //       cartRef.doc(doc.id).delete();
    //     }
    //   });
    // });
    cartRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const productData = doc.data();
        if (
          productData.userEmail === localStorage.getItem("email") &&
          props.cartProduct.pid === doc.data().pid
        ) {
          cartRef.doc(doc.id).delete();
        }
      });
    });
  };

  return (
    <div className="cartProduct">
      <div className="cartProductInfo">
        <div className="cartProductImage">
          <img src={props.cartProduct.image} alt={props.cartProduct.title} />
        </div>
        <div className="cartProductDetails">
          <p>{props.cartProduct.title}</p>
          <div className="seller">
            <p>Seller: {sellerName[Math.floor(Math.random() * 5)]} Online</p>
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
              alt="fassured"
            />
          </div>
          <h3>₹{props.cartProduct.price}</h3>
        </div>
        <div className="cartProductDelivery">
          <p>
            Delivery in 2 days, Tue | <span className="free">Free</span>
            <span className="strikeLine">₹40</span>
          </p>
          <p className="replace">7 Days Replacement Policy</p>
        </div>
      </div>

      <div className="cartProductEdit">
        <div className="quantityEdit">
          <div className="decreaseQuantity">-</div>
          <div className="quantityValue">
            <input
              type="text"
              name="quantityValue"
              className="quantityValue"
              value={props.cartProduct.quantity}
              readOnly
              onChange={handleQuantityValue}
            />
          </div>
          <div className="increaseQuantity">+</div>
        </div>
        <div className="removeItem" onClick={removeCartItem}>
          <h4>REMOVE</h4>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
