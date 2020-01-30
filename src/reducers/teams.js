module.exports = (state = [], action) => {
    switch (action.type) {
        case 'TEAM_INIT_COMPLETE':
            return action.data;
        case 'TEAM_ADD':
            return [
                ...state,
                action.data,
            ];
        case 'TEAM_REMOVE':
            const newState = [...state];
            newState.indexOf(action.data) > -1 && newState.splice(newState.indexOf(data), 1);
            return newState;
        default:
            return state;
    }
};