import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import Copyright from "./Copyright";
import Footer from "./Footer";

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="baselayout" style={{ position: "relative" }}>
      <main
        className=""
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
        }}
      >
        <Header />

        {children}
        <Footer />
        <Copyright />
      </main>
    </div>
  );
};

export default BaseLayout;
