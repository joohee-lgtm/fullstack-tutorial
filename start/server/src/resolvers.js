const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        // fieldName: (parent, args, context, info) => data;
        launches: async (_, {pageSize = 20, after}, {dataSources}) => {
            const allLaunchers = await dataSources.launchAPI.getAllLaunches();

            allLaunchers.reverse();
            
            const launches = paginateResults({
                after,
                pageSize,
                results: allLaunchers
            });

            return {
                launches,
                cursor: launches.length ? launches[launches.length -1].cursor : null,
                hasMore: launches.length ? launches[launches.length -1].cursor !== allLaunchers[allLaunchers.length -1].cursor : false
            }

        },
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

