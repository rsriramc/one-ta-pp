import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter, /*HashRouter*/ } from "react-router-dom";
import { createStore,compose,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

import reducer from "./Store/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   reducer,
   composeEnhancers(applyMiddleware(thunk))
);

const app = (
   <BrowserRouter basename="/one-ta-pp/">
      <App />
   </BrowserRouter>
);

   //  console.log("This is the process.env", process.env.PUBLIC_URL);

ReactDOM.render(
   <Provider store={store}>
      <React.StrictMode>{app}</React.StrictMode>
   </Provider>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
