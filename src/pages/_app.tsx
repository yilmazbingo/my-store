import React from "react";
import { wrapper } from "../redux/store";
import { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "bootstrap/dist/css/bootstrap.min.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";
// import "slate-simple-editor/dist/index.css";
import "@/styles/main.scss";
import "@/styles/bootstrap.min.css";
// import "normalize.css/normalize.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(App);
// export default App;

//if we call getInitialProps from here, other pages getInitialProps would be invalid. we have to call all other pages getInitialProps here manually
// it will break the static optimization
