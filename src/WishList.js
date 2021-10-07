import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BallRotate } from "react-pure-loaders";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import "./WishList.css";
import WishListProduct from "./WishListProduct";

function WishList() {
  const [loading, setLoading] = useState(true);
  const [wishListProducts, setWishListProducts] = useState([]);

  const getWishListProducts = () => {
    const wishRef = db.collection("wishlist");
    setLoading(true);
    wishRef.onSnapshot((querySnapshot) => {
      const wishListItems = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.userEmail === localStorage.getItem("email")) {
          wishListItems.push(productData);
        }
      });
      setWishListProducts(wishListItems);
      setLoading(false);
    });
  };

  useEffect(() => {
    getWishListProducts();
    document.title = "My Wishlist";
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
      </div>
    );
  }

  if (wishListProducts.length === 0) {
    return (
      <div className="center">
        <img
          src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          alt="empty"
        />
        <p className="empty">Your wishlist is empty!</p>
        <p>It's a good day to add the items you like!</p>
      </div>
    );
  }

  return (
    <div className="wishList">
      <div className="wishListContainer">
        <div className="wishListHeading">
          <h1>My Wishlist ({wishListProducts.length})</h1>
        </div>
        {wishListProducts.map((wishListProduct) => (
          <Link
            to={"/product/" + wishListProduct.pid}
            key={wishListProduct.pid}
          >
            <WishListProduct wishListProduct={wishListProduct} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WishList;
