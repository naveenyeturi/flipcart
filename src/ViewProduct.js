import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BallRotate } from "react-pure-loaders";
import { db } from "./firebase";
import "./ViewProduct.css";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";

function ViewProduct() {
  const params = useParams();
  //   console.log(params.pid);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [wish, setWish] = useState(false);

  const getProductDetails = () => {
    setLoading(true);
    const pid = params.pid;
    const productsRef = db.collection("products");
    productsRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.pid === pid) {
          setProduct(productData);
          setLoading(false);
        }
      });
    });
  };

  const checkWishList = () => {
    const wishRef = db.collection("wishlist");
    wishRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.pid === params.pid) {
          setWish(true);
        }
      });
    });
  };

  useEffect(() => {
    getProductDetails();
    checkWishList();
  }, []);

  const WishList = (e) => {
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

  if (loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
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