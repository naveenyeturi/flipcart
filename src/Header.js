import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import NotificationsIcon from "@material-ui/icons/Notifications";
import GetAppIcon from "@material-ui/icons/GetApp";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useState } from "react";
import { BallClipRotate } from "react-pure-loaders";
import { Link, useRouteMatch } from "react-router-dom";
import { auth } from "./firebase.js";
import { useDispatch, useSelector } from "react-redux";

function Header({ search, setSearch }) {
  const [nameHover, setNameHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const dispatch = useDispatch();
  const storeValues = useSelector((state) => state);

  const match = useRouteMatch("/cart");

  const userName =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).displayName;

  const logout = () => {
    auth.signOut();
    localStorage.clear("email");
    localStorage.clear("user");
    localStorage.clear();
    setNameHover(false);
    setMoreHover(false);
    dispatch({
      type: "SET_CART",
      payload: [],
    });
  };

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <Link to="/">
            <img
              width="75"
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt="Flipkart"
              title="Flipkart"
              onClick={() => setSearch("")}
            />
          </Link>
          <a className="plus" href="/">
            ExplorePlus
            <img
              width="10"
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
              alt="plus"
              title="Plus"
            />
          </a>
        </div>
        <div className="header__search">
          <input
            type="search"
            name="search"
            id="search"
            title="Search for products, brands and more..."
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="searchicon" />
        </div>

        <div className="header__menuitems">
        {userName ? (
            <div
              className="item"
              onClick={() => {
                setNameHover(!nameHover);
                setMoreHover(false);
              }}
            >
              {userName}
              {nameHover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          ) : storeValues.loading ? (
            <div className="item">
              <BallClipRotate color={"#ffffff"} loading={true} />
            </div>
          ) : storeValues.user ? (
            <div
              className="item"
              onClick={() => {
                setNameHover(!nameHover);
                setMoreHover(false);
              }}
            >
              {storeValues.user.displayName}
              {nameHover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          ) : (
            <Link to="/signin">
              <div className="login-btn">Login</div>
            </Link>
          )}

          {match ? (
            ""
          ) : (
            <div
              className="item"
              onClick={() => {
                setMoreHover(!moreHover);
                setNameHover(false);
              }}
            >
              More {moreHover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          )}
          {match ? (
            ""
          ) : (
            <Link to="/cart">
              <div className="item">
                <div>
                  {storeValues.user &&
                  !storeValues.loading &&
                  storeValues.cart ? (
                    storeValues.cart.length <= 0 ? (
                      ""
                    ) : (
                      <p className="cartLength">{storeValues.cart.length}</p>
                    )
                  ) : (
                    ""
                  )}
                  <ShoppingCartIcon />
                </div>
                Cart
              </div>
            </Link>
          )}
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
        <Link to="/wishlist">
          <div className="dropitem">
            <FavoriteIcon />
            <p>Wishlist</p>
          </div>
        </Link>
        <div className="dropitem" onClick={logout}>
          <PowerSettingsNewIcon />
          <p>Logout</p>
        </div>
      </div>

      <div className={moreHover ? "moredrop" : "hidemoredrop"}>
        <Link to="/admin">
          <div className="dropitem">
            <AddBoxIcon />
            <p>Add Products</p>
          </div>
        </Link>
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
