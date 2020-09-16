import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/client";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0,
});

export default function LogoutButton() {
  const client = useApolloClient();

  return (
    <StyledButton
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    ></StyledButton>
  );
}
