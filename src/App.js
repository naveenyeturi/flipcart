import "./App.css";
import Header from "./Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { useState } from "react";
import { auth } from "./firebase.js";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
  }, [user]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signin">
            <Header user={user} />
            <Signin setUser={setUser} />
          </Route>

          <Route path="/signup">
            <Header />
            <Signup />
          </Route>

          <Route path="/">
            <Header user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
