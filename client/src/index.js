/*
Entry point to app
Makes the Redux store available to all nested components
Sets up BrowserRouter for navigation
*/
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import setupInterceptors from "./services/setupInterceptors"
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

setupInterceptors(store);