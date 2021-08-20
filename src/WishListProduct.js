import React from "react";
import "./WishListProduct.css";
import StarRateIcon from "@material-ui/icons/StarRate";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./firebase";

function WishListProduct(props) {
  const removeFromWishList = (e) => {
    e.preventDefault();
    if (window.confirm("Remove this item?")) {
      const wishRef = db.collection("wishlist");
      wishRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          if (
            productData.userEmail === localStorage.getItem("email") &&
            productData.pid === props.wishListProduct.pid
          ) {
            wishRef.doc(doc.id).delete();
          }
        });
      });
    }
  };

  return (
    <div className="wishListProduct">
      <div className="wishListProductImage">
        <img
          src={props.wishListProduct.image}
          alt={props.wishListProduct.title}
        />
      </div>
      <div className="wishListProductDetails">
        <div className="wishListProductName">{props.wishListProduct.title}</div>

        <div className="productRating">
          <div className="rating">
            {props.wishListProduct.rating}
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
        <div className="price">
          <span className="netPrice">₹{props.wishListProduct.price}</span>{" "}
          <span className="strikeLine">
            ₹
            {parseInt(
              parseInt(props.wishListProduct.price) +
                0.05 * props.wishListProduct.price
            )}
          </span>
          <span className="offer green">5% off</span>
        </div>
      </div>
      <div className="wishListProductDelete" onClick={removeFromWishList}>
        <DeleteIcon style={{ opacity: 0.7 }} />
      </div>
    </div>
  );
}

export default WishListProduct;
