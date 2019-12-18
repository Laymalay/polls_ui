import React from "react";
import Loading from "../shared/loading";

const withLoading = Component => {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    
    return <Loading />;
  };
};
export default withLoading;
