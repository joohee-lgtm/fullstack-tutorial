import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";
import { RouteComponentProps } from "@reach/router";
import * as GetCartItemsTypes from "./__generated__/GetCartItems";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItemsTypes.GetCartItems>(
    GET_CART_ITEMS
  );

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return (
    <>
      <Header>My Cart</Header>
      {!data || (!!data && data.cartItems.length === 0) ? (
        <p data-testid="empty-message">No Items in your cart</p>
      ) : (
        <Fragment>
          {!!data &&
            data.cartItems.map((launchId: any) => (
              <CartItem key={launchId} launchId={launchId} />
            ))}
          <BookTrips cartItems={!!data ? data.cartItems : []}></BookTrips>
        </Fragment>
      )}
    </>
  );
};

export default Cart;
