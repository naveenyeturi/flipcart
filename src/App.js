import "./App.css";
import Header from "./Header";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Signin from "./Signin";
import Signup from "./Signup";
import { auth } from "./firebase.js";
import { useEffect, useState } from "react";
import Products from "./Products";
import Cart from "./Cart";
import Admin from "./Admin";
import ViewProduct from "./ViewProduct";
import WishList from "./WishList";

import { useDispatch, useSelector } from "react-redux";

import { loggedIn, setCart, setProducts } from "./redux/actions";
import { setLoading } from "./redux/actions";

function App() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const storeValues = useSelector((state) => state);
  // console.log(storeValues);

  useEffect(() => {
    dispatch(setLoading(true));
    auth.onAuthStateChanged((authUser) => {
      dispatch(loggedIn(authUser));
      dispatch(setCart());
    });
    dispatch(setProducts());
  }, []);

  return (
    <Router>
      <div className="app">
        <Header search={search} setSearch={setSearch} />
        <Switch>
          <Route path="/admin" exact>
            <Admin />
          </Route>

          <Route path="/signin" exact>
            {storeValues.user ? <Redirect to="/" /> : <Signin />}
          </Route>

          <Route path="/signup" exact>
            {storeValues.user ? <Redirect to="/" /> : <Signup />}
          </Route>

          <Route path="/wishlist" exact>
            {!localStorage.getItem("email") && !storeValues.user ? (
              <Redirect to="/signin" />
            ) : (
              <WishList />
            )}
          </Route>

          <Route path="/product/:pid">
            <ViewProduct />
          </Route>

          <Route path="/cart" exact>
            {!localStorage.getItem("email") && !storeValues.user ? (
              <Redirect to="/signin" />
            ) : (
              <Cart />
            )}
          </Route>

          <Route path="/category/:categoryName" exact>
            <Products search={search} setSearch={setSearch} />
          </Route>

          <Route path="/" exact>
            <Products search={search} setSearch={setSearch} />
          </Route>
          <Route path="/">
            <h1>404 Page Not Found...</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
