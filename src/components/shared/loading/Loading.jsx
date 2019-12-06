import { Spinner } from "react-bootstrap";
import React from "react";

import "./Loading.css";

const Loading = () => (
  <Spinner className="spinner" animation="grow" variant="info" />
);

export default Loading;
