import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";
import App from "./App";
import { render } from "react-dom";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
