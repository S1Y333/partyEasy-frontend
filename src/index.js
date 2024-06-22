import React from "react";
import "./styles/globals.scss";
import App from "./App";
import { createRoot } from "react-dom/client";
import {store} from "./app/store"
import { Provider } from "react-redux";
import NotFoundPage from "./pages/Error/Error";
import  ErrorBoundary  from './components/ErrorBoundary/ErrorBoundary';

const container = document.getElementById("root");
const root = createRoot(container); 

root.render(
  <>
    <Provider store={store}>
      <ErrorBoundary >
        <App />
      </ErrorBoundary>
    </Provider>
  </>
);
