module.exports = {
    Query: {
        // fieldName: (parent, args, context, info) => data;
        launches: (_, __, {dataSources}) => dataSources.launchAPI.getAllLaunches(),
        launch: (_, {id}, {dataSources}) => dataSources.launchAPI.getLaunchById({launchId: id}),
        me: (_, __, {dataSources}) => dataSources.userAPI.findOrCreateUser(),
        LaunchIds: (_, __, {dataSources}) => dataSources.userAPI.getLaunchIdsByUser()
    }
}

