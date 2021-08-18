import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "./firebase.js";

import "./Product.css";

function Product(props) {
  const history = useHistory();
  const addtocart = () => {
    if (!props.user) {
      history.push("/signin");
    }

    if (props.user) {
      const cartRef = db.collection("cart");
      cartRef.add({
        pid: props.product.pid,
        title: props.product.title,
        image: props.product.image,
        price: props.product.price,
        category: props.product.category,
        description: props.product.description,
        rating: props.product.rating,
        quantity: 1,
        userEmail: props.user.email,
      });
      // props.setCart(props.product);
    }
  };

  // console.log(props.user.email);

  var isInCart = false;
  const checkInCart = () => {
    const cart = props.cart;
    // var isInCart = false;

    for (let index = 0; index < cart.length; index++) {
      // console.log(props.product.id + " " + cart[index].id);
      // console.log(cart[index]);
      if (props.product.pid === cart[index].pid) {
        isInCart = true;
      }
    }
  };

  checkInCart();

  return (
    <div className="product">
      <Link
        className="link"
        to={"/product/" + props.product.pid}
        // to={{
        //   pathname: `product/${props.product.title}`,
        //   query: { id: props.product.pid },
        // }}
      >
        <div className="productItem">
          <div className="image">
            <img
              src={props.product.image}
              alt={props.product.image}
              title={props.product.title}
            />
          </div>
          <div className="title">
            <h2>{props.product.title}</h2>
          </div>
          <div className="desc">
            <h5>{props.product.description}</h5>
          </div>
        </div>
      </Link>

      {isInCart && props.user ? (
        <Link to="/cart">
          <div className="incart">
            <button>Go to cart</button>
          </div>
        </Link>
      ) : (
        <div className="addtocart">
          <button onClick={addtocart}>Add to cart</button>
        </div>
      )}
    </div>
  );
}

export default Product;
