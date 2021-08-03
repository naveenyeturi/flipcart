import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useState } from "react";

function Header() {
  const [nameHover, setNameHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);

  return (
    <div className="header">
      <div className="header__logo">
        <a href="/">
          <img
            width="75"
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
            alt="Flipkart"
            title="Flipkart"
          />
        </a>
        <a className="plus" href="/plus">
          ExplorePlus
          <img
            width="10"
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
          />
        </a>
      </div>
      <div className="header__search">
        <input
          type="search"
          name="search"
          id="search"
          title="Search for products, brands and more"
          placeholder="Search for products, brands and more"
        />
        <SearchIcon className="searchicon" />
      </div>

      <div className="header__menuitems">
        <div className="item" onClick={() => setNameHover(!nameHover)}>
          Naveen {nameHover ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        <div className="item" onClick={() => setMoreHover(!moreHover)}>
          More {moreHover ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        <div className="item">
          <ShoppingCartIcon /> Cart
        </div>
      </div>
    </div>
  );
}

export default Header;
