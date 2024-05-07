import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.scss";
import App from "./App";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import {store} from "./app/store"
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
