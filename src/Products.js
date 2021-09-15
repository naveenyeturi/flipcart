import React from "react";
import "./Products.css";
import { BallRotate } from "react-pure-loaders";
import Product from "./Product";
import Categories from "./Categories";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function Products({ search, setSearch }) {
  const storeValues = useSelector((state) => state);

  const params = useParams();

  let products = storeValues.products;

  if (params.categoryName) {
    products = products.filter(
      (product) => product.category === params.categoryName
    );
  }
  if (search !== "") {
    products = products.filter(
      (product) =>
        product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }

  const categories = [
    {
      categoryName: "Mobiles",
      categoryImage:
        "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    },
    {
      categoryName: "Fashion",
      categoryImage:
        "https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100",
    },
    {
      categoryName: "Electronics",
      categoryImage:
        "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    },
  ];

  if (storeValues.loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
      </div>
    );
  }

  return (
    <>
      <Categories categories={categories} />

      {products.length === 0 ? (
        <center>
          <h1>No Products</h1>
        </center>
      ) : (
        ""
      )}
      <div className="products">
        {products.map((product, i) => {
          return <Product key={product.pid} product={product} />;
        })}
      </div>
    </>
  );
}

export default Products;
