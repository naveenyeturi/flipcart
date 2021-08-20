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
import { useState } from "react";
import { auth, db } from "./firebase.js";
import { useEffect } from "react";
import Products from "./Products";
import Cart from "./Cart";
import Admin from "./Admin";
import ViewProduct from "./ViewProduct";
import WishList from "./WishList";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";

const promise = loadStripe(
  "pk_test_51JQUNuSEgjCkRoiC2hrVueiiGD0MhHTLBCtQ1PE4u4aaKArirLYKM1oKWZlsfJOnZpWueSRz3frlzVC0IXEYpshS009uGVZGRU"
);

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [products, setProducts] = useState([]);   implement like this

  const [search, setSearch] = useState("");

  function getCartProducts() {
    setLoading(true);
    const cartRef = db.collection("cart");
    cartRef.onSnapshot((querySnapshot) => {
      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        // console.log(doc.id);
        if (productData.userEmail === localStorage.getItem("email")) {
          cartItems.push(productData);
        }
      });
      setCart(cartItems);

      setTimeout(() => {
        setLoading(false);
      }, 1);
    });
  }

  useEffect(() => {
    // setLoading(true);
    auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      // setLoading(false);
      // console.log(authUser);
    });

    getCartProducts();
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/admin" exact>
            <Admin />
          </Route>

          <Route path="/signin" exact>
            {user ? <Redirect to="/" /> : ""}
            <Header user={user} search={search} setSearch={setSearch} />
            <Signin setUser={setUser} />
          </Route>

          <Route path="/signup" exact>
            {user ? <Redirect to="/" /> : ""}
            <Header user={user} search={search} setSearch={setSearch} />
            <Signup />
          </Route>

          <Route path="/wishlist" exact>
            {!localStorage.getItem("email") && !user ? (
              <Redirect to="/signin" />
            ) : (
              ""
            )}
            <Header
              user={user}
              loading={loading}
              cart={cart}
              search={search}
              setSearch={setSearch}
            />
            <WishList />
          </Route>

          <Route path="/product/:pid">
            <Header
              user={user}
              loading={loading}
              cart={cart}
              search={search}
              setSearch={setSearch}
            />
            <ViewProduct user={user} cart={cart} />
          </Route>

          <Route path="/cart" exact>
            {!localStorage.getItem("email") && !user ? (
              <Redirect to="/signin" />
            ) : (
              ""
            )}
            <Header
              user={user}
              loading={loading}
              cart={cart}
              search={search}
              setSearch={setSearch}
            />
            {loading ? "" : <Cart cart={cart} setCart={setCart} />}
          </Route>

          <Route path="/payment" exact>
            {!localStorage.getItem("email") && !user ? (
              <Redirect to="/signin" />
            ) : (
              ""
            )}
            <Header
              user={user}
              loading={loading}
              cart={cart}
              search={search}
              setSearch={setSearch}
            />
            <Payment cart={cart} setCart={setCart} />
          </Route>

          <Route path="/category/:categoryName" exact>
            <Header
              user={user}
              loading={loading}
              cart={cart}
              search={search}
              setSearch={setSearch}
            />
            <Products
              cart={cart}
              setCart={setCart}
              loading={loading}
              user={user}
              search={search}
              setSearch={setSearch}
            />
          </Route>
          <Route path="/" exact>
            <Header
              user={user}
              loading={loading}
              cart={cart}
              search={search}
              setSearch={setSearch}
            />
            <Products
              cart={cart}
              setCart={setCart}
              loading={loading}
              user={user}
              search={search}
              setSearch={setSearch}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
