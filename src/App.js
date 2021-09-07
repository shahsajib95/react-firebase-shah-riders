import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Destination from "./pages/Destination/Destination";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Headers from "./component/Navbar/Navbar";
import Register from "./pages/Register/Register";
import { createContext, useState } from "react";

export const UserData = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState([]);
  return (
    <UserData.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Headers />
            {loggedIn.email ? <Redirect to="/"></Redirect> : <Login />}
          </Route>
          <Route path="/register">
            <Headers />
            {loggedIn.email ? <Redirect to="/"></Redirect> : <Register />}
          </Route>
          <PrivateRoute path="/destination">
            <Headers />
            <Destination />
          </PrivateRoute>
          <Route patch="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserData.Provider>
  );
}

export default App;
