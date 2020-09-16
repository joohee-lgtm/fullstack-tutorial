import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { gql, useQuery, from } from "@apollo/client";

import { LaunchTile, Header, Button, Loading } from "../components";
import * as GetLaunchListTypes from "./__generated__/GetLaunchList";
import { GetLaunch } from "../containers/__generated__/GetLaunch";

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const { data, loading, error } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p> Error </p>;
  }

  if (!data) {
    return <p>Not Found</p>;
  }

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
    </Fragment>
  );
};

export default Launches;
