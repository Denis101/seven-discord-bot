const dataReducer = (type, state, action) => {
    const newState = { ...state };

    switch (action.type) {
        case `${type}_INIT_COMPLETE`:
            return action.data;
        case `${type}_CREATE_REQUEST`:
            newState[action.data.slug] = {};
            return newState;
        case `${type}_CREATE_COMPLETE`:
            newState[action.data.slug] = action.data;
            return newState;
        case `${type}_UPDATE_COMPLETE`:
            newState[action.data.slug] = {
                ...newState[action.data.slug],
                ...action.data,
            };
            return newState;
        case `${type}_CREATE_FAILED`:
        case `${type}_REMOVE`:
            delete newState[action.data.slug];
            return newState;
        case `${type}_UPDATE_REQUEST`:
        case `${type}_UPDATE_FAILED`:
        default:
            return state;
    }
};

const setterReducer = (type, state, action) => {
    if (action.type === `${type}_SET`) {
        return action.data;
    }

    return state;
};

module.exports = {
    dataReducer,
    setterReducer,
};