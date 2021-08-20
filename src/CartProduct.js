import React from "react";
import { Link } from "react-router-dom";
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
    if (window.confirm("Remove this item?")) {
      const cartRef = db.collection("cart");
      //don't use snapshot here because it will delete as soon as u add it(it updates when firebase is changed and this code will run)
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
    }
  };

  const decreaseQuantity = () => {
    const cartRef = db.collection("cart");
    cartRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const productData = doc.data();
        if (props.cartProduct.pid === doc.data().pid) {
          const productQuantity = productData.quantity;
          cartRef.doc(doc.id).update({ quantity: productQuantity - 1 });
        }
      });
    });
  };

  const increaseQuantity = () => {
    const cartRef = db.collection("cart");
    cartRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const productData = doc.data();
        if (props.cartProduct.pid === doc.data().pid) {
          const productQuantity = productData.quantity;
          cartRef.doc(doc.id).update({ quantity: productQuantity + 1 });
        }
      });
    });
  };

  return (
    <div className="cartProduct">
      <div className="cartProductInfo">
        <Link to={"/product/" + props.cartProduct.pid}>
          <div className="cartProductImage">
            <img src={props.cartProduct.image} alt={props.cartProduct.title} />
          </div>
        </Link>
        <div className="cartProductDetails">
          <Link
            style={{ color: "black" }}
            to={"/product/" + props.cartProduct.pid}
          >
            <p>{props.cartProduct.title}</p>
          </Link>
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
          <div>
            <button
              className="decreaseQuantity"
              onClick={decreaseQuantity}
              disabled={props.cartProduct.quantity <= 1 ? true : false}
            >
              -
            </button>
          </div>
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
          <div>
            <button
              className="increaseQuantity"
              onClick={increaseQuantity}
              disabled={props.cartProduct.quantity >= 25 ? true : false}
            >
              +
            </button>
          </div>
        </div>
        <div className="removeItem" onClick={removeCartItem}>
          <h4>REMOVE</h4>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
