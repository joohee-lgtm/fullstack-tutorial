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
  const { data, loading, error, fetchMore } = useQuery<
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
      {data.launches && data.launches.hasMore && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                after: data.launches.cursor,
              },
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) {
                  return prev;
                }

                return {
                  ...fetchMoreResult,
                  launches: {
                    ...fetchMoreResult.launches,
                    launches: [
                      ...prev.launches.launches,
                      ...fetchMoreResult.launches.launches,
                    ],
                  },
                };
              },
            })
          }
        ></Button>
      )}
    </Fragment>
  );
};

export default Launches;
