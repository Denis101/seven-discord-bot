module.exports = (state = { 
    initializing: false, 
    complete: false, 
    reducers: {
        dbClient: false,
        discordClient: false,
        characters: false,
        raids: false,
        teams: false,
    },
}, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                initializing: true,
            };
        case 'DB_CLIENT_SET':
            return {
                ...state,
                reducers: {
                    ...state.reducers,
                    dbClient: true,
                },
            };
        case 'DISCORD_CLIENT_SET':
            return {
                ...state,
                reducers: {
                    ...state.reducers,
                    discordClient: true,
                },
            };
        case 'CHARACTERS_INIT_COMPLETE':
            return {
                ...state,
                reducers: {
                    ...state.reducers,
                    characters: true,
                },
            };
        case 'RAIDS_INIT_COMPLETE':
            return {
                ...state,
                reducers: {
                    ...state.reducers,
                    raids: true,
                },
            };
        case 'TEAMS_INIT_COMPLETE':
            return {
                ...state,
                reducers: {
                    ...state.reducers,
                    teams: true,
                },
            };
        case 'INIT_COMPLETE':
            return {
                ...state,
                initializing: false,
                complete: true
            };
        default:
            return state;
    }
};