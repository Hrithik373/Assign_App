import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { useEffect } from "react";
import { hydrate } from "react-dom";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "http://192.168.1.2:5000";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:3000";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Hydrate the app on the client-side
    hydrate(<Component {...pageProps} />, document.getElementById("__next"));
  }, []);

  return <div id="__next" />;
}

export default MyApp;