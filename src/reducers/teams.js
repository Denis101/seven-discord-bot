module.exports = (state = [], action) => {
    switch (action.type) {
        case 'TEAM_ADD':
            return [
                ...state,
                action.team,
            ];
        case 'TEAM_REMOVE':
            const newState = [...state];
            newState.indexOf(action.team) > -1 && newState.splice(newState.indexOf(team), 1);
            return newState;
        default:
            return state;
    }
};