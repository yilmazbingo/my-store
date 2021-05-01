import React from "react";
import Header from "./Header";
import Copyright from "./Copyright";
import Footer from "./Footer";

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="baselayout">
      <main
        className=""
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Header />

        {children}
        <Copyright />
        <Footer />
      </main>
    </div>
  );
};

export default BaseLayout;
