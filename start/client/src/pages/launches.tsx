import React, { Fragment }  from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery, from } from '@apollo/client'

import {LaunchTile, Header, Button, Loading} from '../components';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';

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
  return <div />;
}

export default Launches;
