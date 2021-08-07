import React, { useEffect, useState } from "react";
import "./Products.css";
import { BallRotate } from "react-pure-loaders";
import { db } from "./firebase.js";
import Product from "./Product";

function Products(props) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const productsRef = db.collection("products");

  function getProducts() {
    productsRef.onSnapshot((querySnapshot) => {
      setLoading(true);
      const items = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        items.push(productData);
      });
      setProducts(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading || props.loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
      </div>
    );
  }

  return (
    <div className="products">
      {products.map((product, i) => {
        return (
          <>
            <Product
              key={product.pid}
              product={product}
              cart={props.cart}
              setCart={props.setCart}
              user={props.user}
            />
          </>
        );
      })}
    </div>
  );
}

export default Products;
