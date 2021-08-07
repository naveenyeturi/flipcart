import React, { useEffect, useState } from "react";
import "./Products.css";
import { BallRotate } from "react-pure-loaders";
import { db } from "./firebase.js";
import Product from "./Product";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const productsRef = db.collection("products");

  function getProducts() {
    productsRef.onSnapshot((querySnapshot) => {
      setLoading(true);
      const items = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const productData = doc.data();
        productData.id = doc.id;
        items.push(productData);
      });
      setProducts(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
      </div>
    );
  }

  return (
    <div className="products">
      {products.map((product) => {
        return <Product key={product.id} />;
      })}
    </div>
  );
}

export default Products;
