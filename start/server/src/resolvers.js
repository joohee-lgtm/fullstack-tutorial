module.exports = {
    Query: {
        // fieldName: (parent, args, context, info) => data;
        launches: (_, __, {dataSources}) => dataSources.launchAPI.getAllLaunches(),
        launch: (_, {id}, {dataSources}) => dataSources.launchAPI.getLaunchById({launchId: id}),
        me: (_, __, {dataSources}) => dataSources.userAPI.findOrCreateUser(),
        LaunchIds: (_, __, {dataSources}) => dataSources.userAPI.getLaunchIdsByUser()
    },
    Mission: {
        missionPatch: (mission, {size} = {size: 'LARGE'}) => {
            return size === 'SMALL'
                ? mission.missionPatchSmall
                : mission.missionPatchLarge;
        }
    },
    User: {
        trips: async (_, __, {dataSources}) => {
            const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

            if(!launchIds.length) {
                return [];
            }
            return dataSources.launchAPI.getLaunchById({
                launchIds,
            }) || []
        }
    }
}

