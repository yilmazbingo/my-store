import React from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
// import SpeechBubble from "@/components/SpeechBubble";

const NotFound = () => {
  return (
    <BaseLayout>
      <BasePage noWrapper>
        <div
          className="mx-auto"
          style={{
            marginTop: "10rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src="/images/404.jpg"
            alt="not-found"
            style={{ width: "40rem", height: "40rem" }}
          />
          {/* <SpeechBubble>
            <h2>I COULD NOT FIND THE PAGE</h2>
          </SpeechBubble> */}
          <h3>dkhkahdkahd</h3>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default NotFound;
