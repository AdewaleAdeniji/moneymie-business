import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedRoute = (props) => {
  const { component: Component, ...restOfProps } = props;
  const {loggedin} = useSelector((state) => state.user);
  console.log(loggedin);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        loggedin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
