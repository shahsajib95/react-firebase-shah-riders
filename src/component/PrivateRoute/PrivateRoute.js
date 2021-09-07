import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserData } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loaggedIn] = useContext(UserData)
  return (
    <Route
      {...rest}
      render={({ location }) =>
      loaggedIn?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
