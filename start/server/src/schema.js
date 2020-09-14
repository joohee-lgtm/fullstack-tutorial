const {gql} = require('apollo-server');

const typeDefs = gql`
    # your scheme will go here
    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Query {
        launches( #replace the current launches query with this one.
            """
            The Number Of Result th show. Must be >=1. Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor
            """
            after: String
        ): LaunchConnection!
        launch(id: ID!): Launch
        me: User
        LaunchIds: [Launch]
    }

    type Mutation {
        bookTrip(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String #login token
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    """
    Simple wrapper around our list of launches that contains a cursor to the
    last item in the list. Pass this cursor to the launches query to fetch results
    after these.
    """
    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

`;

module.exports = typeDefs;