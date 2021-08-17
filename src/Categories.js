import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

function Categories({ categoryProducts, categories }) {
  return (
    <div className="categories">
      {categories.map((category, index) => {
        return (
          <Link key={index} to={"/category/" + category.categoryName}>
            <div
              className="category"
              // onClick={() => categoryProducts(category.categoryName)}
            >
              <div className="categoryImage">
                <img src={category.categoryImage} alt={category.categoryName} />
              </div>
              <div className="categoryName">{category.categoryName}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Categories;
