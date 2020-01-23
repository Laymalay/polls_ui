import React from "react";
import Loading from "components/shared/loading";

const withLoading = Component => {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    
    return <Loading />;
  };
};
export default withLoading;
