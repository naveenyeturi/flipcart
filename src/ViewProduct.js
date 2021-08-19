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
  const [gray, setGray] = useState(true);

  const getProductDetails = () => {
    setLoading(true);
    const pid = params.pid;
    const productsRef = db.collection("products");
    productsRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.pid === pid) {
          //   console.log(productData);
          setProduct(productData);
          setLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const addToFavourite = (e) => {
    setGray(!gray);
    // console.log("test");
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
            className={gray ? "favouriteIcon gray" : "favouriteIcon red"}
            style={{ fontSize: 15 }}
            onClick={addToFavourite}
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
