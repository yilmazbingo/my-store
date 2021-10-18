import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Copyright = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        textAlign: "center",
        color: "white",
        bottom: "0",
        position: "fixed",
        width: "100%",
        zIndex: 100,
      }}
    >
      <h4 style={{ color: "white", marginTop: "auto" }}>
        Copyrigth{" "}
        <span>
          {" "}
          <FaRegCopyright />
        </span>{" "}
        Bingology &copy;. All rights reserved
      </h4>
    </div>
  );
};

export default Copyright;
