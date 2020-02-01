const dataReducer = (type, state, action, keyGetter) => {
    const newState = { ...state };

    switch (action.type) {
        case `${type}_INIT_COMPLETE`:
            return action.data;
        case `${type}_CREATE_REQUEST`:
            newState[keyGetter(action.data)] = {};
            return newState;
        case `${type}_CREATE_COMPLETE`:
            newState[keyGetter(action.data)] = action.data;
            return newState;
        case `${type}_UPDATE_COMPLETE`:
            newState[keyGetter(action.data)] = {
                ...newState[keyGetter(action.data)],
                ...action.data,
            };
            return newState;
        case `${type}_CREATE_FAILED`:
        case `${type}_REMOVE`:
            delete newState[keyGetter(action.data)];
            return newState;
        case `${type}_SET`:
        case `${type}_UNSET`:
            return {
                ...state,
                ...action.data,
            };
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