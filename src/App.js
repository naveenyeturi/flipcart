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
import { auth } from "./firebase.js";
import { useEffect } from "react";
import Products from "./Products";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signin">
            {user ? <Redirect to="/" /> : ""}
            <Header user={user} />
            <Signin setUser={setUser} />
          </Route>

          <Route path="/signup">
            {user ? <Redirect to="/" /> : ""}
            <Header user={user} />
            <Signup />
          </Route>

          <Route path="/">
            <Header user={user} loading={loading} />
            <Products />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
