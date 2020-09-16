import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import injectStyles from "./styles";

import { resolvers, typeDefs } from "./resolvers";
import Login from "./pages/login";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);

  return data.isLoggedIn ? <Pages /> : <Login />;
}

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // uri: "http://localhost:4000/",
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  }),
  typeDefs,
  resolvers,
});

// cache.writeData({
//   data: {
//     isLoggedIn: !!localStorage.getItem("token"),
//     cartItems: [],
//   },
// });
cache.writeQuery({
  query: gql`
    query GetCartItems {
      cartItems
    }
  `,
  data: {
    cartItems: [],
  },
});
cache.writeQuery({
  query: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  data: {
    isLoggedIn: !!localStorage.getItem("token")
  },
});

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
