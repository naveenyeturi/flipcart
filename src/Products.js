import React, { useEffect, useState } from "react";
import "./Products.css";
import { BallRotate } from "react-pure-loaders";
import { db } from "./firebase.js";
import Product from "./Product";
import Categories from "./Categories";
import { useParams } from "react-router-dom";

function Products(props) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const params = useParams();
  // console.log(params);

  const categoryProducts = (category) => {
    const productsRef = db.collection("products");
    productsRef.onSnapshot((querySnapshot) => {
      setLoading(true);
      const items = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.category === category || category === "All")
          items.push(productData);
      });
      setProducts(items);
      setLoading(false);
    });
  };

  const searchProduct = () => {
    let productsCopy = products;
    // console.log(productsCopy);
    productsCopy = productsCopy.filter((product) =>
      product.title.toLowerCase().includes(props.search.toLowerCase())
    );
    // console.log(productsCopy);
    setProducts(productsCopy);
  };

  useEffect(() => {
    // console.log(props.search);
    // console.log("search changed");
    searchProduct();
  }, [props.search]);

  useEffect(() => {
    if (params.categoryName !== undefined) {
      categoryProducts(params.categoryName);
    } else if (props.search === "") {
      getProducts();
    }
    // props.setSearch("");
    // console.log(" url params changed");
    if (props.search !== "") {
      searchProduct();
    }
  }, [params]);

  // if (params.categoryName) {
  //   console.log(params.categoryName);
  //   categoryProducts(params.categoryName);
  // }

  const [categories, setCategories] = useState([
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
  ]);

  function getProducts() {
    const productsRef = db.collection("products");
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

  // useEffect(() => {
  //   getProducts();
  // }, []);

  if (loading || props.loading) {
    return (
      <div className="loading">
        <BallRotate color={"#123abc"} loading={true} size={"500"} />
      </div>
    );
  }

  return (
    <>
      <Categories categoryProducts={categoryProducts} categories={categories} />
      <div className="products">
        {products.map((product, i) => {
          return (
            <Product
              key={product.pid}
              product={product}
              cart={props.cart}
              setCart={props.setCart}
              user={props.user}
            />
          );
        })}
      </div>
    </>
  );
}

export default Products;
