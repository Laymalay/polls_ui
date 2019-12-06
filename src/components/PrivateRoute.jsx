import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import { isUserLoggedInQuery } from "../schema/queries";

const PrivateRoute = ({ component, ...rest }) => {
  const { data: { isLoggedIn } = false } = useQuery(isUserLoggedInQuery);

  return (
    <>
      {isLoggedIn && <Route {...rest} component={component} />}
      {!isLoggedIn && <Redirect to="/login" />}
    </>
  );
};

export default PrivateRoute;
