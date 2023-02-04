import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import "./index.scss";
import reduxThunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

// import axios from "axios";
// window.axios = axios;

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
  // uri: "https://bucket-server-production.up.railway.app/",
});

const authLink = setContext((body, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  // uri: "http://localhost:4000/",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// action creators -- initiates changes in redux, they are used to modify the state in redux store
// any action creator expects an immediately returned action. (an action -- a js object with type property and optionally a payload)

// the purpose of redux thunk -- for handling actions that might not be synchronous, for example, using axios to send a GET request. Redux Thunk allows us to dispatch those actions asynchronously and resolve each promise that gets returned.
// so redux thunk gives us the direct access to dispatch function, we can manually pass the action to the dispatch function

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
console.log("store.getState(): ", store.getState());

// Subscribe is an event listener, it fires whenever the store gets updated
store.subscribe(() => console.log("store: ", store.getState()));

const container = document.querySelector("#root");

const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </ApolloProvider>
);
