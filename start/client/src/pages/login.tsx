import React from "react";
import {
  gql,
  ApolloClient,
  useApolloClient,
  useMutation,
} from "@apollo/client";

import { Loading, LoginForm } from "../components";
import * as LoginTypes from "./__generated__/login";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const client: any = useApolloClient();
  const [login, { loading, error }] = useMutation<
    LoginTypes.login,
    LoginTypes.loginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login as string);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });


  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <p>An Error Occured</p>;
  }

  return <LoginForm login={login}></LoginForm>;
}
