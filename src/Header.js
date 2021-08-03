import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import NotificationsIcon from "@material-ui/icons/Notifications";
import GetAppIcon from "@material-ui/icons/GetApp";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useState } from "react";

function Header() {
  const [nameHover, setNameHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);

  return (
    <>
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
              alt="plus"
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
          <div
            className="item"
            onClick={() => {
              setNameHover(!nameHover);
              setMoreHover(false);
            }}
          >
            Naveen {nameHover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          <div
            className="item"
            onClick={() => {
              setMoreHover(!moreHover);
              setNameHover(false);
            }}
          >
            More {moreHover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          <div className="item">
            <ShoppingCartIcon /> Cart
          </div>
        </div>
      </div>

      <div className={nameHover ? "namedrop" : "hidenamehover"}>
        <div className="dropitem">
          <AccountCircleIcon />
          <p>My Profile</p>
        </div>
        <div className="dropitem">
          <ViewModuleIcon />
          <p>Orders</p>
        </div>
        <div className="dropitem">
          <FavoriteIcon />
          <p>Wishlist</p>
        </div>
        <div className="dropitem">
          <PowerSettingsNewIcon />
          <p>Logout</p>
        </div>
      </div>

      <div className={moreHover ? "moredrop" : "hidemoredrop"}>
        <div className="dropitem">
          <NotificationsIcon />
          <p>Notification Preferences</p>
        </div>
        <div className="dropitem">
          <ContactSupportIcon />
          <p>24x7 Customer Care</p>
        </div>
        <div className="dropitem">
          <GetAppIcon />
          <p>Download App</p>
        </div>
      </div>
    </>
  );
}

export default Header;
