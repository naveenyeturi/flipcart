import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BallRotate } from "react-pure-loaders";
import { db } from "./firebase";
import "./ViewProduct.css";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";

function ViewProduct(props) {
  const params = useParams();
  const [wish, setWish] = useState(false);
  const storeValues = useSelector((state) => state);
  const product = storeValues.products.filter(
    (product) => product.pid === params.pid
  )[0];

  var isInCart = false;
  const checkInCart = () => {
    const cart = storeValues.cart;
    for (let index = 0; index < cart.length; index++) {
      if (product.pid === cart[index].pid) {
        isInCart = true;
      }
    }
  };

  if (product) {
    checkInCart();
  }

  useEffect(() => {
    const checkWishList = () => {
      const wishRef = db.collection("wishlist");
      wishRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          if (
            productData.pid === params.pid &&
            productData.userEmail === localStorage.getItem("email")
          ) {
            setWish(true);
          }
        });
      });
    };
    checkWishList();
  }, [params.pid]);

  const WishList = (e) => {
    if (!localStorage.getItem("email")) {
      history.push("/signin");
      return;
    }
    if (wish) {
      setWish(false);
      removeFromWishList();
    } else {
      setWish(true);
      addToWishList();
    }
  };

  const addToWishList = (e) => {
    const wishRef = db.collection("wishlist");
    wishRef.add({
      pid: product.pid,
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      description: product.description,
      rating: product.rating,
      userEmail: localStorage.getItem("email"),
    });
  };

  const removeFromWishList = (e) => {
    const wishRef = db.collection("wishlist");
    wishRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (
          productData.userEmail === localStorage.getItem("email") &&
          productData.pid === params.pid
        ) {
          wishRef.doc(doc.id).delete();
        }
      });
    });
  };

  const history = useHistory();
  const addtocart = () => {
    if (!storeValues.user) {
      history.push("/signin");
    }

    if (storeValues.user) {
      const cartRef = db.collection("cart");
      cartRef.add({
        pid: product.pid,
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
        description: product.description,
        rating: product.rating,
        quantity: 1,
        userEmail: storeValues.user.email,
      });
    }
  };

  if (storeValues.loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="loading">
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="viewProduct">
      <div className="productLeft">
        <div className="productImage">
          <img src={product.image} alt={product.title} />
          <FavoriteIcon
            className={!wish ? "favouriteIcon gray" : "favouriteIcon red"}
            style={{ fontSize: 15 }}
            onClick={WishList}
          />
        </div>
        <div className="buttons">
          {isInCart ? (
            <Link to="/cart">
              <div className="tocartbtn">
                <ShoppingCartIcon />
                <button>GO TO CART</button>
              </div>
            </Link>
          ) : (
            <div className="tocartbtn" onClick={addtocart}>
              <ShoppingCartIcon />
              <button>ADD TO CART</button>
            </div>
          )}
        </div>
      </div>
      <div className="productRight">
        <div className="productName">
          <p>{product.title}</p>
        </div>
        <div className="productRating">
          <div className="rating">
            {product.rating}
            <StarRateIcon style={{ fontSize: 15 }} />
          </div>
          <div className="reviews">
            1,38,011 Ratings & 6,487 Reviews
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
              alt="fassured"
            />
          </div>
        </div>
        <div className="productPrice">
          <span className="green">
            Extra ₹{parseInt(0.05 * product.price)} off
          </span>
          <div className="price">
            <span className="netPrice">₹{product.price}</span>{" "}
            <span className="strikeLine">
              ₹{parseInt(parseInt(product.price) + 0.05 * product.price)}
            </span>
            <span className="offer green">5% off</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
