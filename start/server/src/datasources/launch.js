const {RESTDataSource} = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';

    }

    async getAllLaunches() {
        const response = await this.get('launches');

        if(Array.isArray(response)) {
            return response.map(launch => this.launchReducer(launch))
        } else {
            return [];
        }
    }

    launchReducer(launch) {

        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_data_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            }
        }

    }

    async getLaunchById({launchIds}) {
        const response = await this.get('launches', {flight_number: launchIds});

        return this.launchReducer(response[0]);
    }

    getLaunchByIds({launchIds}) {
        return Promise.all(
            launchIds.map(launchIds => this.getLaunchById({launchIds}))
        )
    }


}

module.exports = LaunchAPI;
