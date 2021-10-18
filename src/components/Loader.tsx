import React from "react";
import { Spinner } from "react-bootstrap";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loaing...</span>
    </Spinner>
  );
};

export default Loader;
