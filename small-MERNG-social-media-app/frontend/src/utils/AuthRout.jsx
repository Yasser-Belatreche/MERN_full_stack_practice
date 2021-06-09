import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalContext } from "../context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
