import React from "react";
import { Route, Redirect } from "react-router-dom";

// redux
import store from "../redux/store";
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const {
    user: { authenticated },
  } = store.getState();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default connect((state) => ({
  user: state.user,
}))(AuthRoute);
