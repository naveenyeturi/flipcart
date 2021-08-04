import "./App.css";
import Header from "./Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./Signin";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signin">
            <Header />
            <Signin />
          </Route>

          <Route path="/">
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
