const fs = require('fs');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

const reducerFolder = `${process.cwd()}/src/reducers`;
let reducers = null;

const rootReducer = (state = {}, action) => {
    if (reducers === null) {
        reducers = fs.readdirSync(reducerFolder)
            .filter(f => f.endsWith('.js'))
            .map(f => ({
                name: f.replace('.js', ''),
                handler: require(`${reducerFolder}/${f}`),
            }));
    }

    const newState = {};
    reducers.forEach(r => {
        newState[r.name] = r.handler(state[r.name], action);
    });

    return newState;
}

let store = createStore(rootReducer, applyMiddleware(thunk));
module.exports = store;